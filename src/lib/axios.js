import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://news-portal-server-ivory.vercel.app/api",
  withCredentials: true, // যদি auth লাগে
});

// optional: request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // token add করতে চাইলে এখানে করো
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
