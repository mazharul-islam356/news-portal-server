import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ecommerce-server-nine-ashen.vercel.app/api",
  withCredentials: false,
});

export default api;
