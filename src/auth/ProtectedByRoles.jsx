import { useKeycloak } from "@react-keycloak/web";

import usePBelAppFlowController from "../hooks/pBelHooks/usePBelAppFlowController";

function ProtectedByRoles({ roles, children }) {
  const accessGranted = usePBelAppFlowController();
  const { keycloak } = useKeycloak();
  const condition = (role) => keycloak.hasResourceRole(role);

  return (
    <>
      {accessGranted &&
        (keycloak.authenticated && roles.every(condition) ? (
          <>{children}</>
        ) : (
          <></>
        ))}
    </>
  );
}

export default ProtectedByRoles;
