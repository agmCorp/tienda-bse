import "./App.css";

// PrimeReact
import "./primereact-theme/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// ReduxTookit
import store from "./reduxToolkit/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// Keycloak
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./utils/keycloak";

import { BrowserRouter } from "react-router-dom";
import { StrictMode, useState } from "react";

import Main from "./components/pBelInsQuote/Main";
import SplashScreen from "./components/common/SplashScreen";

function App() {
  let persistor = persistStore(store);
  const [keycloakReady, setKeycloakReady] = useState(false);

  // Keycloak ready
  const onKeycloakEvent = (event, error) => {
    if (event && event === "onReady") {
      setKeycloakReady(true);
    }
  };

  // Just a log
  const onKeycloakTokens = (tokens) => {
    console.log("onKeycloakTokens", tokens);
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
      LoadingComponent={<SplashScreen />}
    >
      {keycloakReady && (
        <StrictMode>
          <Provider store={store}>
            <PersistGate loading={<SplashScreen />} persistor={persistor}>
              <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Main />
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </StrictMode>
      )}
    </ReactKeycloakProvider>
  );
}

export default App;
