import { requestRefreshToken } from "../utils/auth";
import HttpClient from "../utils/httpClient";
import { getToken, saveToken } from "../utils/token";

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

httpClient.response((response) => {
  if (response.status === 401 && !response.url.includes("refresh-token")) {
    return requestRefreshToken().then((token) => {
      if (token) {
        saveToken(token);
        return httpClient;
      }
    });
  }
  return response;
});
//Cấu hình token
// if (getToken()) {
//   const token = getToken();
//   httpClient.setToken(token.access_token);
// }

export { httpClient };
