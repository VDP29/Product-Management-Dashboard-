
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/app/providers";

function ProductFormPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { products } = useProducts();

  if (!id) return <ProductForm />;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="content">
        <h1>Product not found</h1>
        <p className="muted">The product you're trying to edit doesn't exist.</p>
      </main>
    );
  }

  return <ProductForm key={product.id} product={product} />;
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<main className="content">Loading product form...</main>}>
      <ProductFormPage />
    </Suspense>
  );
}
