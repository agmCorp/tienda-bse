import { getAllPBelPaymentFlowStepsConfig } from "./pBelUtils/pBelPaymentFlowStepsConfig";
import { getFirstRoute } from "./stepsHelper";

const getProductFolder = () => {
  let result = "";
  const url = new URL(window.location.href);
  let currentUrl = url.pathname;

  const searchString = process.env.PUBLIC_URL;
  const index = currentUrl.indexOf(searchString);
  if (index !== -1) {
    const startIndex = index + searchString.length;
    const endIndex = currentUrl.indexOf("/", startIndex + 1);
    if (endIndex !== -1) {
      result = currentUrl.substring(startIndex, endIndex + 1);
    }
  }
  return result;
};

const isPBel = () => {
  const productFolder = getProductFolder();
  return productFolder !== ""
    ? getFirstRoute(getAllPBelPaymentFlowStepsConfig()).startsWith(
        productFolder
      )
    : false;
};

export { isPBel };
