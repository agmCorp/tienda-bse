// AGM 05/23
import Keycloak from "keycloak-js";

// BSE configuration
// const keycloak = new Keycloak({
//   url: "https://sso-test.bse.com.uy/auth/",
//   realm: "MiBSE",
//   clientId: "tienda-bse",
// });

// Local configuration
const keycloak = new Keycloak({
  url: "http://localhost:8180/auth",
  realm: "MiBSE",
  clientId: "tienda-bse",
});

export default keycloak;
