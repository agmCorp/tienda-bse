import { useSelector } from "react-redux";

import {
  selectPBelFlowStep,
  pBelFlowGoToStep,
} from "../../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { getAllPBelFlowStepsConfig } from "../../../utils/pBelUtils/pBelFlowStepsConfig";
import FlowSteps from "../FlowSteps";

function PBelFlowSteps() {
  return (
    <FlowSteps
      step={useSelector(selectPBelFlowStep)}
      flowGoToStep={pBelFlowGoToStep}
      getAllFlowStepsConfig={getAllPBelFlowStepsConfig}
    />
  );
}

export default PBelFlowSteps;
