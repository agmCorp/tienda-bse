import { useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";

import PBelPageNotFound from "../../routes/pBel/PBelPageNotFound";
import { ROUTE_NOT_FOUND } from "../../routes/pBel/pBelRoutes";
import { getAllPBelFlowStepsConfig } from "../../utils/pBel/pBelFlowStepsConfig";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBel/pBelPaymentFlowStepsConfig";
import { isPBel } from "../../utils/productHelper";
import {
  pBelDebtControl,
  selectPBelFlowSelectedData,
} from "../../reduxToolkit/pBel/pBelFlowSlice";
import GenericPageNotFound from "../../routes/GenericPageNotFound";
import { API_PBEL_DEBT_CONTROL } from "../../utils/apiUrls";
import { getDocument, getDocumentType } from "../../utils/userProfileHelper";
import { clientApi } from "../../utils/clientApi";

function Main({ onAuthSuccessStarted }) {
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
  const [afterLoginSuccess, setAfterLoginSuccess] =
    useState(onAuthSuccessStarted);
  const selectedData = useSelector(selectPBelFlowSelectedData);

  useEffect(() => {
    const debtControl = async () => {
      const response = await clientApi(
        "get",
        `${API_PBEL_DEBT_CONTROL}/${getDocumentType(
          keycloak.tokenParsed
        )}/${getDocument(keycloak.tokenParsed)}/${
          selectedData.insurance.nroCotizacion
        }/0`,
        true,
        {},
        {},
        {},
        keycloak.token
      );

      console.log("DEUDA - RESPUESTA", response);
      if (response.ok) {
        dispatch(pBelDebtControl(response.data.clienteConDeuda));
      }
    };

    const pBelAfterLoginSuccess = () => {
      if (isPBel()) {
        console.log("DEUDA - EJECUTO Debt control");
        debtControl();
      }
    };

    // Code to execute immediately after login success (depends on the product)
    if (afterLoginSuccess) {
      pBelAfterLoginSuccess();
      setAfterLoginSuccess(false);
    }
  }, [
    afterLoginSuccess,
    dispatch,
    keycloak.token,
    keycloak.tokenParsed,
    selectedData.insurance.nroCotizacion,
  ]);

  const pBelFlowSteps = getAllPBelFlowStepsConfig();
  const pBelPaymentFlowSteps = getAllPBelPaymentFlowStepsConfig();

  let routes = [];

  // PBel flow
  pBelFlowSteps.forEach((stepConfig) => {
    const item = { path: stepConfig.route, element: stepConfig.element };
    routes.push(item);
  });

  // PBel Payment flow
  pBelPaymentFlowSteps.forEach((stepConfig) => {
    const item = { path: stepConfig.route, element: stepConfig.element };
    routes.push(item);
  });

  // Page not found (depends on the product).
  const pageNotFound = {
    path: ROUTE_NOT_FOUND,
    element: isPBel() ? <PBelPageNotFound /> : <GenericPageNotFound />,
  };
  routes.push(pageNotFound);

  // Routes
  const element = useRoutes(routes);

  return <>{element}</>;
}

export default Main;
