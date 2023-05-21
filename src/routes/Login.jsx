import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

function Login() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      auth.signinRedirect();
    }
  }, []);

  return <></>;
}

export default Login;
