import { useSelector } from "react-redux";

import {
  selectPBelPaymentFlowStep,
  pBelPaymentFlowGoToStep,
} from "../../../reduxToolkit/pBel/pBelPaymentFlowSlice";
import { getAllPBelPaymentFlowStepsConfig } from "../../../utils/pBel/pBelPaymentFlowStepsConfig";
import FlowSteps from "../FlowSteps";

function PBelFlowSteps() {
  return (
    <FlowSteps
      step={useSelector(selectPBelPaymentFlowStep)}
      flowGoToStep={pBelPaymentFlowGoToStep}
      getAllFlowStepsConfig={getAllPBelPaymentFlowStepsConfig}
    />
  );
}

export default PBelFlowSteps;
