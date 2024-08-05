import { httpClient } from "../configs/client";
import { getToken, removeToken, saveToken } from "./token";
export const requestLogin = async (data) => {
  const response = await httpClient.post("/auth/login", data);
  if (response.ok) {
    saveToken(response.data);
    httpClient.setToken(response.data.access_token);
    return response.data;
  }
  return false;
};

export const getUser = async () => {
  // const { access_token: accessToken } = getToken();
  // if (accessToken) {
  //   const response = await fetch(
  //     `${import.meta.env.VITE_SERVER_API}/auth/profile`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     const newToken = await requestRefreshToken();
  //     if (newToken) {
  //       saveToken(newToken);
  //       return getUser();
  //     }
  //   }
  // }
  // return false;
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
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );
    if (response.ok) {
      return response.json();
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
