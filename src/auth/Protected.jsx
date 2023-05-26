import { useKeycloak } from "@react-keycloak/web";

import Login from "./Login";

function Protected({ children }) {
  const { keycloak } = useKeycloak();

  return keycloak.authenticated ? <>{children}</> : <Login />;
}

export default Protected;
