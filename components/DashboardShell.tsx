import Link from "next/link";
import type { ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="topbar">
        <Link href="/products" className="brand">
          ProductHub
        </Link>
        <span>Product Management</span>
      </header>
      {children}
    </>
  );
}
