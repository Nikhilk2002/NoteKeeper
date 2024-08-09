import axios from "axios";

const userInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

userInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("JWT");
    console.log("Token from local storage:", token); // Verify the token is retrieved correctly
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { userInstance };
