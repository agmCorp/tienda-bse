import { useRoutes } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import PBelPageNotFound from "../../routes/pBel/PBelPageNotFound";
import { ROUTE_NOT_FOUND } from "../../routes/pBel/pBelRoutes";
import { getAllPBelFlowStepsConfig } from "../../utils/pBel/pBelFlowStepsConfig";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBel/pBelPaymentFlowStepsConfig";
import { isPBel } from "../../utils/productHelper";
import { pBelDebtControl } from "../../reduxToolkit/pBel/pBelFlowSlice";
import GenericPageNotFound from "../../routes/GenericPageNotFound";

function Main({ onAuthSuccessStarted }) {
  const dispatch = useDispatch();
  const pBelFlowSteps = getAllPBelFlowStepsConfig();
  const pBelPaymentFlowSteps = getAllPBelPaymentFlowStepsConfig();
  const [afterLoginSuccess, setAfterLoginSuccess] =
    useState(onAuthSuccessStarted);
  const isPBelProduct = isPBel();

  const pBelAfterLoginSuccess = () => {
    if (isPBelProduct) {
      console.log("HAGO CONTROL DE DEUDA");
      dispatch(pBelDebtControl(true));
    }
    setAfterLoginSuccess(false);
  };

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
    element: isPBelProduct ? <PBelPageNotFound /> : <GenericPageNotFound />,
  };
  routes.push(pageNotFound);

  // Routes
  const element = useRoutes(routes);

  // Code to execute immediately after login success (depends on the product)
  if (afterLoginSuccess) {
    pBelAfterLoginSuccess();
  }

  return <>{element}</>;
}

export default Main;
