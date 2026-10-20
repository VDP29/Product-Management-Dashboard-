import { NextResponse } from "next/server";
import { initialProducts } from "@/data/products";

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { searchParams } = new URL(request.url);
  if (searchParams.get("fail") === "1") {
    return NextResponse.json(
      { message: "The demo request was intentionally rejected." },
      { status: 503 },
    );
  }

  return NextResponse.json(initialProducts);
}
