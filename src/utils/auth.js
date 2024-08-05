import { httpClient } from "../configs/client";
import { getToken, removeToken } from "./token";
export const requestLogin = async (data) => {
  const response = await httpClient.post("/auth/login", data);
  if (response.ok) {
    return response.data;
  }
  return false;
};

export const getUser = async () => {
  const response = await httpClient.get("/auth/profile");
  if (response.ok) {
    return response.data;
  }
  return false;
};

export const logout = () => {
  removeToken();
};

export const requestRefreshToken = async () => {
  const { refresh_token: refreshToken } = getToken();
  if (refreshToken) {
    const response = await httpClient.post("/auth/refresh-token", {
      refreshToken,
    });
    if (response.ok) {
      return response.data;
    }
  }
  return false;
};

/*
Request 1 ==> Success
Request 2 ==> Expired ==> Refresh Token ==> Request 2
Request 3 ==> Expired ==> Refresh Token ==> Request 3
Request 4 ==> Expired ==> Refresh Token ==> Request 4

Vấn đề: Refresh Token 3 lần

Giải pháp

Request 1 ==> Success
Request 2 ==> Expired ==> Refresh Token ==> Request 2 
                                                      Request 3
                                                      Request 4
*/

// let token = `My Token`;
// let isExpired = false;
// let refreshTokenPromise = null;
// const refreshToken = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newToken = `New Token: ${Math.random()}`;
//       resolve(newToken);
//     }, 2000);
//   });
// };
// const callApi = (url) => {
//   setTimeout(async () => {
//     if (url === `/users`) {
//       isExpired = true;
//     }
//     if (isExpired) {
//       if (!refreshTokenPromise) {
//         refreshTokenPromise = refreshToken();
//       }
//       const newToken = await refreshTokenPromise;
//       token = newToken;
//       isExpired = false;
//     }

//     console.log(`Call API: ${url}`, `Token: ${token}`);
//   }, 1000);
// };

// callApi("/profile");
// callApi("/users");
// callApi("/courses");
// callApi("/posts");
// callApi("/products");
