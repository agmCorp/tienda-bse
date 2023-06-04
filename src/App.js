import "./App.css";

// PrimeReact
import "./primereactTheme/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { addLocale } from "primereact/api";

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

import SplashScreen from "./components/common/SplashScreen";
import Main from "./routes/Main";

function App() {
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    dayNamesMin: ["DO", "LU", "MA", "MI", "JU", "VI", "SA"],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    today: "Hoy",
    clear: "Claro",
  });

  let persistor = persistStore(store);
  const [keycloakReady, setKeycloakReady] = useState(false);
  const [onAuthSuccess, setOnAuthSuccess] = useState(false);
  const [onAuthLogout, setOnAuthLogout] = useState(false);

  const onKeycloakEvent = async (event, error) => {
    // Login Success
    if (event === "onAuthSuccess") {
      setOnAuthSuccess(true);
      setOnAuthLogout(false);
    }

    // Logout
    if (event === "onAuthLogout") {
      setOnAuthSuccess(false);
      setOnAuthLogout(true);
    }

    // Token expired
    if (event === "onTokenExpired") {
      try {
        // If the Access Token Lifespan on kyecloak-server is at the default value of 5 minutes, you should use a value less than 300 seconds.
        const refreshed = await keycloak.updateToken(180); // Three minutes
        console.log(
          refreshed
            ? "Token was successfully refreshed"
            : "Token is still valid"
        );
      } catch (err) {
        console.log(
          "*** Failed to refresh the token, or the session has expired"
        );
      }
    }

    // Keycloak ready
    if (event === "onReady") {
      setKeycloakReady(true);
    }
  };

  // Just a log
  const onKeycloakTokens = (tokens) => {
    console.log("*** onKeycloakTokens", tokens);
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
                <Main
                  onAuthSuccess={onAuthSuccess}
                  onAuthLogout={onAuthLogout}
                />
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </StrictMode>
      )}
    </ReactKeycloakProvider>
  );
}

export default App;
