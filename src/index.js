import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const oidcConfig = {
  // On sign in callback hook. Can be a async function.
  // We remove the code and state parameters from the url when we are redirected from the authorize
  // page (i.e. payload from the URL upon successful login).
  // Otherwise if you refresh the page and the payload is still there, signinSilent - which handles renewing your token - won't work.
  onSigninCallback: async (user) => {
    console.log("ONSINGING!!", window.location.href);
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  onRemoveUser: () => {
    // let currentUrl = window.location.href;
    // const searchString = process.env.PUBLIC_URL;
    // const index = currentUrl.indexOf(searchString);
    // const home =
    //   currentUrl.substring(0, index + searchString.length) +
    //   "/objPersonal/datosBasicos";
    // console.log("home!!", home);
    // window.location.href =
    //   "http://localhost:3000/aplicaciones/tiendaBSE/objPersonal/datosBasicos";
    console.log("me llamaron");
  },

  authority: "http://localhost:8180/auth/realms/MiBSE",
  client_id: "tienda-bse",
  redirect_uri:
    "http://localhost:3000/aplicaciones/tiendaBSE/objPersonal/datosAdicionales",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
