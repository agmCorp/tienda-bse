import Keycloak from "keycloak-js";

// BSE configuration url: "https://sso-test.bse.com.uy/auth/"
// Local configuration url: "http://localhost:8180/auth",
const keycloak = new Keycloak({
  url: "http://localhost:8180/auth",
  realm: "MiBSE",
  clientId: "tienda-bse",
});

export default keycloak;
