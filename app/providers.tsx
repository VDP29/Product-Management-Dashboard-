"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/types/product";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  loadProducts: (simulateFailure?: boolean) => Promise<void>;
  retryProducts: (simulateFailure?: boolean) => void;
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async (simulateFailure = false) => {
    try {
      const response = await fetch(
        simulateFailure ? "/api/products?fail=1" : "/api/products",
      );
      if (!response.ok) {
        throw new Error(
          `Request failed (${response.status}). Please try again.`,
        );
      }

      const loadedProducts: Product[] = await response.json();
      setProducts(loadedProducts);
      setError(null);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "An unexpected error occurred while loading products.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => void loadProducts(), 0);
    return () => window.clearTimeout(timeout);
  }, [loadProducts]);

  const retryProducts = useCallback(
    (simulateFailure = false) => {
      setLoading(true);
      setError(null);
      void loadProducts(simulateFailure);
    },
    [loadProducts],
  );

  function addProduct(product: Omit<Product, "id">) {
    const nextId = products.reduce((largestId, currentProduct) => {
      const numericId = Number(currentProduct.id.slice(1));
      return Number.isSafeInteger(numericId)
        ? Math.max(largestId, numericId)
        : largestId;
    }, 0) + 1;
    const newProduct: Product = {
      ...product,
      id: `P${String(nextId).padStart(3, "0")}`,
    };

    setProducts((current) => [...current, newProduct]);
    return newProduct;
  }

  function updateProduct(updatedProduct: Product) {
    setProducts((current) =>
      current.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        loadProducts,
        retryProducts,
        addProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside Providers");
  }

  return context;
}