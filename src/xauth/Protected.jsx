import { useKeycloak } from "@react-keycloak/web";
import { useSelector } from "react-redux";

import Login from "./Login";
import { selectPBelDebtControl } from "../reduxToolkit/pBel/pBelFlowSlice";

function Protected({ children }) {
  const { keycloak } = useKeycloak();

  const pBelDebtControl = useSelector(selectPBelDebtControl);
  console.log("TIENE DEUDA?: ", pBelDebtControl);

  return keycloak.authenticated ? <>{children}</> : <Login />;
}

export default Protected;
