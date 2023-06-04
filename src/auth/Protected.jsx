import { useKeycloak } from "@react-keycloak/web";

import Login from "./Login";
import usePBelAppFlowController from "../hooks/pBelHooks/usePBelAppFlowController";

function Protected({ children }) {
  const accessGranted = usePBelAppFlowController();
  const { keycloak } = useKeycloak();

  return (
    <>
      {accessGranted && (keycloak.authenticated ? <>{children}</> : <Login />)}
    </>
  );
}

export default Protected;
