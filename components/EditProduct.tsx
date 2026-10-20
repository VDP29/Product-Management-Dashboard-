"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { ProductForm } from "@/components/ProductForm";
import { useProducts } from "@/app/providers";

export function EditProduct({ id }: { id: string }) {
  const router = useRouter();
  const { products, loading, error, retryProducts, updateProduct } =
    useProducts();
  const product = products.find((item) => item.id === id);
  const categories = [...new Set(products.map((item) => item.category))];

  return (
    <DashboardShell>
      <main className="content content-narrow">
        <Link href={`/products/${encodeURIComponent(id)}`} className="back-link">
          ← Back to product
        </Link>
        {loading ? (
          <div className="notice" role="status">
            Loading product…
          </div>
        ) : error ? (
          <div className="notice notice-error" role="alert">
            <h1>Couldn’t load product</h1>
            <p>{error}</p>
            <button
              className="secondary-button"
              type="button"
              onClick={() => retryProducts()}
            >
              Retry
            </button>
          </div>
        ) : !product ? (
          <div className="notice">
            <h1>Product not found</h1>
            <p>There is no product with ID {id}.</p>
            <Link href="/products" className="primary-button">
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="page-heading">
              <div>
                <p className="eyebrow">INVENTORY MANAGEMENT</p>
                <h1>Edit product</h1>
                <p className="muted">Update {product.name}.</p>
              </div>
            </div>
            <section className="panel">
              <ProductForm
                initialProduct={product}
                categories={categories}
                onSave={(changes) => {
                  updateProduct({ ...product, ...changes });
                  router.push(`/products/${encodeURIComponent(product.id)}`);
                }}
              />
            </section>
          </>
        )}
      </main>
    </DashboardShell>
  );
}
