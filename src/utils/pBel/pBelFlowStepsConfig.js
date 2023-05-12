// AGM 05/23
import PBelFlowBasicData from "../../routes/pBel/PBelFlowBasicData";
import PBelFlowQuote from "../../routes/pBel/PBelFlowQuote";
import PBelFlowPaymentPlan from "../../routes/pBel/PBelFlowPaymentPlan";
import PBelFlowAdditionalData from "../../routes/pBel/PBelFlowAdditionalData";
import PBelFlowImages from "../../routes/pBel/PBelFlowImages";
import {
  P_BEL_FLOW_ROUTE_BASIC_DATA,
  P_BEL_FLOW_ROUTE_QUOTE,
  P_BEL_FLOW_ROUTE_PAYMENT_PLAN,
  P_BEL_FLOW_ROUTE_ADD_DATA,
  P_BEL_FLOW_ROUTE_IMAGES,
} from "../../routes/pBel/pBelRoutes";

const pBelFlowStepsConfig = [
  {
    label: "1",
    description: "Datos básicos",
    route: P_BEL_FLOW_ROUTE_BASIC_DATA,
    element: <PBelFlowBasicData />,
    secured: false,
  },
  {
    label: "2",
    description: "Cotizacion",
    route: P_BEL_FLOW_ROUTE_QUOTE,
    element: <PBelFlowQuote />,
    secured: false,
  },
  {
    label: "3",
    description: "Plan de pagos",
    route: P_BEL_FLOW_ROUTE_PAYMENT_PLAN,
    element: <PBelFlowPaymentPlan />,
    secured: false,
  },
  {
    label: "4",
    description: "Datos adicionales",
    route: P_BEL_FLOW_ROUTE_ADD_DATA,
    element: <PBelFlowAdditionalData />,
    secured: false,
  },
  {
    label: "5",
    description: "Imágenes adjuntas",
    route: P_BEL_FLOW_ROUTE_IMAGES,
    element: <PBelFlowImages />,
    secured: true,
  },
];

const getPBelFlowStepConfig = (step) => {
  return 0 < step && step <= pBelFlowStepsConfig.length
    ? pBelFlowStepsConfig[step - 1]
    : null;
};

const getAllPBelFlowStepsConfig = () => {
  return pBelFlowStepsConfig;
};

export { getPBelFlowStepConfig, getAllPBelFlowStepsConfig };
