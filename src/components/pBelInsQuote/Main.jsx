import { useRoutes } from "react-router-dom";

import PageNotFound from "../../routes/pBel/PBelPageNotFound";
import { ROUTE_NOT_FOUND } from "../../routes/routes";
import { getAllPBelFlowStepsConfig } from "../../utils/pBelFlowStepsConfig";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBelPaymentFlowStepsConfig";

function Main() {
  const pBelFlowSteps = getAllPBelFlowStepsConfig();
  const pBelPaymentFlowSteps = getAllPBelPaymentFlowStepsConfig();

  let routes = [];

  // PBel flow
  pBelFlowSteps.forEach((stepConfig) => {
    const item = { path: stepConfig.route, element: stepConfig.element };
    routes.push(item);
  });

  // Payment flow
  pBelPaymentFlowSteps.forEach((stepConfig) => {
    const item = { path: stepConfig.route, element: stepConfig.element };
    routes.push(item);
  });

  // Page not found
  const item = { path: ROUTE_NOT_FOUND, element: <PageNotFound /> };
  routes.push(item);

  // Routes
  const element = useRoutes(routes);

  return <>{element}</>;
}

export default Main;
