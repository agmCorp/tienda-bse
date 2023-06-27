import { useKeycloak } from "@react-keycloak/web";
import Login from "./Login";

function ProtectedByRoles({ roles, children }) {
  const { keycloak } = useKeycloak();
  const condition = (role) => keycloak.hasResourceRole(role);

  let renderChildren = false;
  if (keycloak.authenticated) {
    if (roles.every(condition)) {
      renderChildren = true;
    } else {
      keycloak.logout();
    }
  }

  return renderChildren ? <>{children}</> : <Login />;
}

export default ProtectedByRoles;
