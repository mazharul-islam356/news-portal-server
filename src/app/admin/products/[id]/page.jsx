"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/app/components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id; // Next.js returns string

  return <ProductForm mode="edit" productId={id} />;
}
