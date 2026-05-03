import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const authHeader = {
  headers: {
    Authorization: process.env.NEXT_PUBLIC_ADMIN_TOKEN || "",
  },
};
