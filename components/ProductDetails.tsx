"use client";

import Link from "next/link";
import Image from "next/image";
import { DashboardShell } from "@/components/DashboardShell";
import { useProducts } from "@/app/providers";

export function ProductDetails({ id }: { id: string }) {
  const { products, loading, error, retryProducts } = useProducts();
  const product = products.find((item) => item.id === id);

  return (
    <DashboardShell>
      <main className="content content-narrow">
        <Link href="/products" className="back-link">
          ← Back to products
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
            <p>
              There is no product with ID <strong>{id}</strong>. It may have
              been removed or the link may be incorrect.
            </p>
            <Link href="/products" className="primary-button">
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="page-heading">
              <div>
                <p className="eyebrow">PRODUCT DETAILS</p>
                <h1>{product.name}</h1>
                <p className="muted">Product ID: {product.id}</p>
              </div>
              <Link
                href={`/products/${encodeURIComponent(product.id)}/edit`}
                className="primary-button"
              >
                Edit product
              </Link>
            </div>
            <section className="panel detail-panel">
              <Image
                className="detail-image"
                src={product.thumbnail}
                alt=""
                width={120}
                height={120}
                unoptimized
              />
              <dl className="detail-grid">
                <div>
                  <dt>Category</dt>
                  <dd>{product.category}</dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd>${product.price.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>Stock</dt>
                  <dd>{product.stock}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{product.status}</dd>
                </div>
              </dl>
            </section>
          </>
        )}
      </main>
    </DashboardShell>
  );
}
