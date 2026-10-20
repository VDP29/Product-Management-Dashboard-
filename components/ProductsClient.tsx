"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useProducts } from "@/app/providers";
import { DashboardShell } from "@/components/DashboardShell";

export function ProductsClient() {
  const { products, loading, error, retryProducts } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesStatus = status === "All" || product.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    if (sort === "asc") result.sort((a, b) => a.price - b.price);
    if (sort === "desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, search, category, status, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setSort("default");
  };

  return (
    <DashboardShell>
      <main className="content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">INVENTORY MANAGEMENT</p>
            <h1>Products</h1>
            <p className="muted">Manage and track your inventory.</p>
          </div>
          <Link href="/products/new" className="primary-button">
            + Add Product
          </Link>
        </div>

        <div className="stats">
          <div className="stat-card">
            <span>Total products</span>
            <strong>{products.length}</strong>
          </div>
          <div className="stat-card">
            <span>Active products</span>
            <strong>
              {products.filter((product) => product.status === "Active").length}
            </strong>
          </div>
          <div className="stat-card">
            <span>Low stock (5 or fewer)</span>
            <strong>
              {products.filter((product) => product.stock <= 5).length}
            </strong>
          </div>
        </div>

        <section className="panel" aria-labelledby="products-heading">
          <div className="panel-heading">
            <div>
              <h2 id="products-heading">All products</h2>
              {!loading && !error && (
                <p className="muted">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              )}
            </div>
          </div>

          {loading ? (
            <div className="notice" role="status" aria-live="polite">
              Loading products…
            </div>
          ) : error ? (
            <div className="notice notice-error" role="alert">
              <h3>Couldn’t load products</h3>
              <p>{error}</p>
              <button
                className="secondary-button"
                type="button"
                onClick={() => retryProducts()}
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="filters">
                <label>
                  <span>Search products</span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name…"
                  />
                </label>
                <label>
                  <span>Category</span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="All">All categories</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Status</span>
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <option value="All">All statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
                <label>
                  <span>Sort by price</span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="default">Default order</option>
                    <option value="asc">Price: low to high</option>
                    <option value="desc">Price: high to low</option>
                  </select>
                </label>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="empty-state">
                  <h3>No products found</h3>
                  <p>Try changing your search or filters.</p>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <div className="product-cell">
                              <Image
                                src={product.thumbnail}
                                alt=""
                                width={44}
                                height={44}
                                unoptimized
                              />
                              <strong>{product.name}</strong>
                            </div>
                          </td>
                          <td>{product.id}</td>
                          <td>{product.category}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>{product.stock}</td>
                          <td>
                            <span
                              className={`status ${
                                product.status === "Active"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td>
                            <Link
                              href={`/products/${encodeURIComponent(product.id)}`}
                              className="text-link"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </DashboardShell>
  );
}
