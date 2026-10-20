
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useProducts } from "@/app/providers";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const { products } = useProducts();

  const product = products.find((item) => item.id === params.id);

  if (!product) {
    return (
      <main className="content">
        <h1>Product not found</h1>
        <p className="muted">
          This product does not exist or is no longer available.
        </p>
        <Link href="/products" className="primary-button">
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <header className="topbar">
        <Link href="/products" className="brand">
          ProductHub
        </Link>
        <Link href="/products" className="text-link">
          Back to Products
        </Link>
      </header>

      <section className="content">
        <p className="eyebrow">PRODUCT DETAILS</p>
        <h1>{product.name}</h1>
        <p className="muted">Product ID: {product.id}</p>

        <section className="panel" style={{ padding: 24, marginTop: 24 }}>
          <img
            src={product.thumbnail}
            alt={product.name}
            width={120}
            height={120}
            style={{ objectFit: "cover", borderRadius: 12 }}
          />

          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Status:</strong> {product.status}</p>

          <Link
            href={`/products/new?id=${encodeURIComponent(product.id)}`}
            className="primary-button"
          >
            Edit Product
          </Link>
        </section>
      </section>
    </main>
  );
}
