
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/app/providers";
import type { Product, ProductStatus } from "@/types/product";

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const { addProduct, updateProduct } = useProducts();
  const router = useRouter();

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [stock, setStock] = useState(product ? String(product.stock) : "");
  const [status, setStatus] = useState<ProductStatus>(
    product?.status ?? "Active"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!name.trim()) nextErrors.name = "Product name is required.";
    if (!category.trim()) nextErrors.category = "Category is required.";

    if (price.trim() === "" || !Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      nextErrors.price = "Price must be greater than zero.";
    }

    if (
      stock.trim() === "" ||
      !Number.isInteger(parsedStock) ||
      parsedStock < 0
    ) {
      nextErrors.stock = "Stock must be a non-negative whole number.";
    }

    if (!status) nextErrors.status = "Please select a status.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const values = {
      name: name.trim(),
      category: category.trim(),
      price: parsedPrice,
      stock: parsedStock,
      status,
      thumbnail:
        product?.thumbnail ??
        `https://placehold.co/100x100?text=${encodeURIComponent(name.trim())}`,
    };

    if (product) {
      updateProduct({ ...product, ...values });
      router.push(`/products/${encodeURIComponent(product.id)}`);
    } else {
      const newProduct = addProduct(values);
      router.push(`/products/${encodeURIComponent(newProduct.id)}`);
    }
  }

  return (
    <main className="dashboard">
      <header className="topbar">
        <Link href="/products" className="brand">ProductHub</Link>
        <Link href="/products" className="text-link">Back to Products</Link>
      </header>

      <section className="content">
        <p className="eyebrow">INVENTORY MANAGEMENT</p>
        <h1>{product ? "Edit Product" : "Add Product"}</h1>
        <p className="muted">
          {product ? "Update the product information below." : "Enter the details for your new product."}
        </p>

        <form className="panel product-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              Product name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
            </label>

            <label>
              Category
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="e.g. Electronics"
                aria-invalid={Boolean(errors.category)}
                aria-describedby={errors.category ? "category-error" : undefined}
              />
              {errors.category && <span id="category-error" className="field-error">{errors.category}</span>}
            </label>

            <label>
              Price ($)
              <input
                type="number"
                min="0.01"
                step="any"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                aria-invalid={Boolean(errors.price)}
                aria-describedby={errors.price ? "price-error" : undefined}
              />
              {errors.price && <span id="price-error" className="field-error">{errors.price}</span>}
            </label>

            <label>
              Stock
              <input
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                aria-invalid={Boolean(errors.stock)}
                aria-describedby={errors.stock ? "stock-error" : undefined}
              />
              {errors.stock && <span id="stock-error" className="field-error">{errors.stock}</span>}
            </label>

            <label>
              Status
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as ProductStatus)}
                aria-invalid={Boolean(errors.status)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <span className="field-error">{errors.status}</span>}
            </label>
          </div>

          <div className="form-actions">
            <Link href="/products" className="secondary-button">Cancel</Link>
            <button type="submit" className="primary-button">
              {product ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
