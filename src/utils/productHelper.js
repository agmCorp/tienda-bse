import { getAllPBelFlowStepsConfig } from "./pBel/pBelFlowStepsConfig";
import { routeToStep } from "./stepsHelper";

const getCurrentRoute = () => {
  let result = "";
  const url = new URL(window.location.href);
  let currentUrl = url.pathname;
  const searchString = process.env.PUBLIC_URL;
  const index = currentUrl.indexOf(searchString);
  if (index !== -1) {
    result = currentUrl.substring(index + searchString.length);
  }
  return result;
};

const isPBel = () => {
  return routeToStep(getAllPBelFlowStepsConfig(), getCurrentRoute()) > 0;
};

export { isPBel };
