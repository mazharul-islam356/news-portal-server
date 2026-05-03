"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.variant?.name, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    updateQuantity(item.productId, item.variant?.name, item.quantity + 1);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center text-gray-600">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border p-4 rounded-md"
            >
              <div className="relative w-24 h-24 flex-shrink-0 border rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                {item.variant && (
                  <p className="text-gray-500 text-sm">
                    Variant: {item.variant.name}
                  </p>
                )}

                <p className="text-gray-700 mt-1">Price: ৳ {item.price}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="border px-2 py-1 rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="border px-2 py-1 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="font-semibold">৳ {item.price * item.quantity}</p>
                <button
                  onClick={() =>
                    removeFromCart(item.productId, item.variant?.name)
                  }
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border p-6 rounded-md h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <p className="mb-2">Total Items: {totalItems}</p>
          <p className="mb-6 font-semibold text-lg">
            Total Price: ৳ {totalPrice}
          </p>
          <Link href="/checkout">
            <button className="w-full bg-[#a6804e] text-white py-3 rounded hover:bg-gray-800 transition">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
