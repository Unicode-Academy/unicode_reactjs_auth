import axios from "axios";
import { getToken, saveToken } from "../utils/token";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (getToken()) {
      const token = getToken();
      config.headers["Authorization"] = `Bearer ${token.access_token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    if (
      response.status === 201 &&
      response.request.responseURL.includes("/auth/login")
    ) {
      saveToken(response.data);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
