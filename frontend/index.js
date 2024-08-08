// const urlLogin = `https://api.unicode.dev:8443/auth/login`;
// const handleLogin = async () => {
//   const response = await fetch(urlLogin, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: "admin@gmail.com",
//       password: "123456",
//     }),
//     credentials: "include",
//   });

//   const data = await response.json();
//   console.log(data);
// };
// handleLogin();

const getProfile = async () => {
  const response = await fetch("https://api.unicode.dev:8443/auth/profile", {
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
};
getProfile();
