import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PBelPageNotFound from "../../routes/pBelRoutes/PBelPageNotFound";
import { ROUTE_NOT_FOUND } from "../../routes/pBelRoutes/pBelRoutes";
import { getAllPBelFlowStepsConfig } from "../../utils/pBelUtils/pBelFlowStepsConfig";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBelUtils/pBelPaymentFlowStepsConfig";
import { isPBel } from "../../utils/productHelper";
import GenericPageNotFound from "../../routes/GenericPageNotFound";
import {
  eventOnAuthLogout,
  eventOnAuthSuccess,
} from "../../reduxToolkit/userSlice";

function Main({ onAuthSuccess, onAuthLogout }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventOnAuthSuccess(onAuthSuccess));
    dispatch(eventOnAuthLogout(onAuthLogout));
  }, [dispatch, onAuthSuccess, onAuthLogout]);

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
