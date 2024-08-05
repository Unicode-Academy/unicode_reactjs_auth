import { requestRefreshToken } from "../utils/auth";
import HttpClient from "../utils/httpClient";
import { getToken, saveToken } from "../utils/token";
let refreshTokenPromise = null;
const httpClient = new HttpClient({
  serverApi: import.meta.env.VITE_SERVER_API,
});

httpClient.request((config) => {
  if (getToken()) {
    const token = getToken();
    config.headers["Authorization"] = `Bearer ${token.access_token}`;
  }
  return config;
});

httpClient.response(async (response) => {
  if (response.url.includes("/auth/login") && response.ok) {
    saveToken(response.data);
  }
  if (
    response.status === 401 &&
    !response.url.includes("/auth/refresh-token")
  ) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = requestRefreshToken();
    }
    const newToken = await refreshTokenPromise;
    if (newToken) {
      saveToken(newToken);
      return httpClient;
    }
  }
  return response;
});
//Cấu hình token
// if (getToken()) {
//   const token = getToken();
//   httpClient.setToken(token.access_token);
// }

export { httpClient };
