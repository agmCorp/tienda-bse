import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

function Login() {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (!keycloak.authenticated) {
      keycloak.login();
    }
  }, [keycloak]);

  return <></>;
}

export default Login;
