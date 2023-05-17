import { useRoutes } from "react-router-dom";

import PBelPageNotFound from "../../routes/pBel/PBelPageNotFound";
import { ROUTE_NOT_FOUND } from "../../routes/pBel/pBelRoutes";
import { getAllPBelFlowStepsConfig } from "../../utils/pBel/pBelFlowStepsConfig";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBel/pBelPaymentFlowStepsConfig";

function Main() {
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

  // Page not found.
  // As we only have one product we redirect to PBel
  const pageNotFound = { path: ROUTE_NOT_FOUND, element: <PBelPageNotFound /> };
  routes.push(pageNotFound);

  // Routes
  const element = useRoutes(routes);

  return <>{element}</>;
}

export default Main;
