"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/lib/axios";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, totalItems } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch product
  const fetchProduct = async () => {
    try {
      const res = await api.get(`/get-product/${id}`);
      const data = res.data.data;

      setProduct(data);
      setActiveImage(data.images?.[0]);
      setSelectedVariant(data.variants?.[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  const price = selectedVariant?.price || 0;
  let finalPrice = price;
  if (product.discount?.type === "flat")
    finalPrice = price - product.discount.value;
  if (product.discount?.type === "percent")
    finalPrice = price - (price * product.discount.value) / 100;

  // Add to Cart
  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      image: product.images[0],
      variant: selectedVariant,
      price: finalPrice,
      quantity: qty,
    });
  };

  // Buy Now
  const handleBuyNow = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      image: product.images[0],
      variant: selectedVariant,
      price: finalPrice,
      quantity: qty,
    });

    router.push("/checkout"); // Replace with your checkout page
  };

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative w-full h-[450px] border rounded-xl overflow-hidden">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {product.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-20 border rounded cursor-pointer overflow-hidden ${activeImage === img ? "border-black" : ""}`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold">৳ {finalPrice}</span>
            {product.discount && (
              <span className="line-through text-gray-400">৳ {price}</span>
            )}
          </div>

          {/* Variant Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Select Variant</h3>
            <div className="flex flex-wrap gap-3">
              {product.variants?.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 text-sm py-1.5 border rounded transition ${selectedVariant?.name === v.name ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-semibold">Quantity</span>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border px-3 py-1 rounded w-20"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#a6804e] text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="border px-6 py-3 rounded hover:bg-gray-100 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
