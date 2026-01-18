import axios, {
  // AxiosError,
  type AxiosInstance,
  // type AxiosResponse,
  // type InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// // Request interceptor untuk menambahkan token
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem("access_token");
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

// // Response interceptor untuk menangani error 401
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       // Hapus token dan arahkan ke halaman sign-in
//       localStorage.removeItem("access_token");
//       window.location.href = "/sign-in";
//     }
//     return Promise.reject(error);
//   }
// );

export {api};
