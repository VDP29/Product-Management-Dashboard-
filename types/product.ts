export type ProductStatus = "Active" | "Inactive";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  thumbnail: string;
}