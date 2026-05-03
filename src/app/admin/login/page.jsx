"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function AdminLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await api.post("/admin/login", { phone, password });
      console.log(res);
      localStorage.setItem("token", res.data.token);
      router.push("/admin/dashboard");
      toast.success("Login Successfull!");
    } catch (error) {
      let message = "Login failed";
      console.log(error);
      if (error.response) {
        // Server responded with error status
        message = error.response.data?.message || message;
      } else if (error.request) {
        // Request sent but no response
        message = "Server not responding";
      } else {
        // Other error
        message = error.message;
      }

      // alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
