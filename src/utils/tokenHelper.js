// import jwt_decode from "jwt-decode";

// import { USER_TOKEN } from "./constants";

// const validateToken = () => {
//   let userPayload = {};
//   let isLoggedIn = false;
//   const token = sessionStorage.getItem(USER_TOKEN);

//   if (token) {
//     userPayload = jwt_decode(token);
//     // JWT expiration is in seconds
//     if (userPayload.exp * 1000 < new Date().getTime()) {
//       console.error("*** TOKEN EXPIRED!");
//       isLoggedIn = removeToken().isLoggedIn;
//     } else {
//       isLoggedIn = true;
//     }
//   }
//   return { ...userPayload, token: token, isLoggedIn: isLoggedIn };
// };

// const removeToken = () => {
//   sessionStorage.removeItem(USER_TOKEN);
//   return { isLoggedIn: false };
// };

// const addToken = (token) => {
//   sessionStorage.setItem(USER_TOKEN, token);
//   return { isLoggedIn: true };
// };
const validateToken = () => {
  return { token: "VER_COMO_OBTENER_EL_TOKEN_DE_KEYCLOAK" };
};
export { validateToken };
