import { getToken } from "../utils/token";
import HttpClient from "../utils/httpClient";

const httpClient = new HttpClient({
  serverApi: import.meta.env.VITE_SERVER_API,
});

//Cấu hình token
if (getToken()) {
  const token = getToken();
  httpClient.setToken(token.access_token);
}

console.log(httpClient);

export { httpClient };
