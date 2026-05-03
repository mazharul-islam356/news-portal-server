"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

import { Trash, Edit, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { noImg } from "@/app/(public)/page";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/get-products");
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await api.delete(`/delete-products/${id}`);
      fetchProducts(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link href="/admin/products/add">
          <Button className="flex items-center gap-2">
            <Plus size={18} /> Add Product
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Variants</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="p-2 border w-24">
                  <Image
                    width={500}
                    height={500}
                    src={product.images?.[0] || noImg}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-2 border">{product.name}</td>

                <td className="p-2 border">{product.category?.name}</td>

                <td className="p-2 border">
                  {product.variants?.map((v) => v.name).join(", ")}
                </td>

                <td className="p-2 border">
                  {product.variants?.map((v) => v.price).join(" / ")} TK
                </td>

                <td className="p-2 border flex gap-2">
                  <Link href={`/admin/products/${product._id}`}>
                    <Button variant="outline" size="sm">
                      <Edit size={16} />
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this product?")
                      ) {
                        handleDelete(product._id);
                      }
                    }}
                  >
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
