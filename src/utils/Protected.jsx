import { useAuth } from "react-oidc-context";

import Login from "../routes/Login";

function Protected({ children }) {
  const auth = useAuth();

  return auth.isAuthenticated ? <>{children}</> : <Login />;
}

export default Protected;
