import axios from "axios";
const apiUrl = "https://absa-password-vault-server.vercel.app";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    let striped_token = token.replace(/^"|"$/g, '');
    if (token) {
      config.headers.Authorization = `Bearer ${striped_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;