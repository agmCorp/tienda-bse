// AGM 05/23
import { useKeycloak } from "@react-keycloak/web";

import Login from "../routes/Login";

function Protected({ children }) {
  const { keycloak } = useKeycloak();

  return keycloak.authenticated ? <>{children}</> : <Login />;
}

export default Protected;
