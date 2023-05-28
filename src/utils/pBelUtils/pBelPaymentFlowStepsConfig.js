import PaymentFlowInsurance from "../../routes/pBelRoutes/PBelPaymentFlowInsurance";
import PaymentFlowMethod from "../../routes/pBelRoutes/PBelPaymentFlowMethod";
import PaymentFlowPolicyDetail from "../../routes/pBelRoutes/PBelPaymentFlowPolicyDetail";
import {
  P_BEL_PAYMENT_FLOW_ROUTE_METHOD,
  P_BEL_PAYMENT_FLOW_ROUTE_POLICY_DETAIL,
  P_BEL_PAYMENT_FLOW_ROUTE_INSURANCE,
} from "../../routes/pBelRoutes/pBelRoutes";

const pBelPaymentFlowStepsConfig = [
  {
    label: "1",
    description: "Método de pago",
    route: P_BEL_PAYMENT_FLOW_ROUTE_METHOD,
    element: <PaymentFlowMethod />,
  },
  {
    label: "2",
    description: "Detalle de póliza",
    route: P_BEL_PAYMENT_FLOW_ROUTE_POLICY_DETAIL,
    element: <PaymentFlowPolicyDetail />,
  },
  {
    label: "3",
    description: "Seguro contratado",
    route: P_BEL_PAYMENT_FLOW_ROUTE_INSURANCE,
    element: <PaymentFlowInsurance />,
  },
];

const getPBelPaymentFlowStepConfig = (step) => {
  return 0 < step && step <= pBelPaymentFlowStepsConfig.length
    ? pBelPaymentFlowStepsConfig[step - 1]
    : null;
};

const getAllPBelPaymentFlowStepsConfig = () => {
  return pBelPaymentFlowStepsConfig;
};

export { getPBelPaymentFlowStepConfig, getAllPBelPaymentFlowStepsConfig };
