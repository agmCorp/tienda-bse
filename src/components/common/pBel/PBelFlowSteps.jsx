// AGM 05/23
import { useSelector } from "react-redux";

import {
  selectPBelFlowStep,
  pBelFlowGoToStep,
} from "../../../reduxToolkit/pBel/pBelFlowSlice";
import { getAllPBelFlowStepsConfig } from "../../../utils/pBel/pBelFlowStepsConfig";
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
