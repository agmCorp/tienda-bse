import { useSelector } from "react-redux";

import {
  selectPBelPaymentFlowStep,
  pBelPaymentFlowGoToStep,
} from "../../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import { getAllPBelPaymentFlowStepsConfig } from "../../../utils/pBelUtils/pBelPaymentFlowStepsConfig";
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
