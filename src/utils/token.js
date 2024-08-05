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
