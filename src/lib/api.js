import axios from "axios";

export const api = axios.create({
  baseURL: "https://news-portal-server-ivory.vercel.app/api",
});

export const authHeader = {
  headers: {
    Authorization: process.env.NEXT_PUBLIC_ADMIN_TOKEN || "",
  },
};
