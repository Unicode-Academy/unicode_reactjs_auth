export const requestLogin = async (data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

export const saveToken = (token) => {
  localStorage.setItem("authToken", JSON.stringify(token));
};
export const getToken = () => {
  try {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (token.access_token && token.refresh_token) {
      return token;
    }
    throw new Error("Token invalid");
  } catch (e) {
    return false;
  }
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};

export const getUser = async () => {
  const { access_token: accessToken } = getToken();
  if (accessToken) {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      return response.json();
    }
  }
  return false;
};

export const logout = () => {
  removeToken();
};
