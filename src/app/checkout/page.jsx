"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import api from "@/lib/axios";
import Link from "next/link";
import { toast } from "sonner";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    number: "",
    address: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // 1️⃣ Validate required fields
    if (!customerInfo.name || !customerInfo.number || !customerInfo.address) {
      alert("Please fill in all required fields.");
      console.log("❌ Checkout: Missing required fields");
      return;
    }

    // 2️⃣ Validate phone format (+8801XXXXXXXXX for Bangladesh)
    const phonePattern = /^\+8801\d{9}$/;
    if (!phonePattern.test(customerInfo.number)) {
      alert("Enter valid phone number (e.g. +8801XXXXXXXXX)");
      console.log(`❌ Checkout: Invalid phone number ${customerInfo.number}`);
      return;
    }

    setLoading(true);
    console.log("Checkout: Placing order...");

    try {
      const payload = {
        customerInfo,
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          variant: item.variant.name,
          quantity: item.quantity,
        })),
        couponCode: couponCode || null,
      };

      // 3️⃣ Send order to backend
      const res = await api.post("/place-order", payload);

      localStorage.removeItem("cart");
      setOrderData(res.data);
      setOrderSuccess(true);

      console.log(
        "Checkout: Order placed successfully, awaiting IVR confirmation",
      );
      toast.success(
        "Order placed successfully! You will receive a confirmation call shortly. " +
          "Press 1 to confirm or 2 to cancel.",
      );
    } catch (error) {
      console.log("Checkout: Failed to place order", error.response?.data);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold tracking-wide">
            STORE
          </Link>
          <p className="text-sm text-gray-500">Secure Checkout</p>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* LEFT - FORM */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Delivery Information</h2>

          <div className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              name="number"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />

            <textarea
              name="address"
              placeholder="Shipping Address"
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Coupon */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Promo Code</p>
            <div className="flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter code"
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <button className="bg-black text-white px-4 rounded-lg">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-6 h-fit">
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-75 overflow-auto pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <Image
                      alt="product"
                      width={500}
                      height={500}
                      src={item.image}
                      className="w-16 h-16 rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.variant?.name} • Qty {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      ৳{(item.variant.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mt-6 border-t pt-4">
                <span className="text-gray-500">Total</span>
                <span className="text-xl font-bold">
                  ৳{totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Cash on delivery available
              </p>
            </>
          )}
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-2">🎉 Order Confirmed</h2>

            <p className="text-gray-500 text-sm mb-4">
              Your order has been placed successfully.
            </p>

            <div className="text-left text-sm border rounded-lg p-4 mb-4">
              <p>
                <strong>Name:</strong> {customerInfo.name}
              </p>
              <p>
                <strong>Email:</strong> {customerInfo.email}
              </p>
              <p>
                <strong>Total:</strong> ৳{totalPrice.toLocaleString()}
              </p>
              {orderData?.orderId && (
                <p>
                  <strong>Order ID:</strong> #{orderData.orderId}
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setOrderSuccess(false);
                setCartItems([]);
                window.location.href = "/";
              }}
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
