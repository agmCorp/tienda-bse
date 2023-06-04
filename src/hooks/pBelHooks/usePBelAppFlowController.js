import { useSelector } from "react-redux";

import {
  pBelFlowGoToFirstStep,
  pBelFlowGoToStep,
  pBelFlowNavigateTo,
  selectPBelFlowNavigateTo,
} from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import {
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowNavigateTo,
  selectPBelPaymentFlowNavigateTo,
  selectPBelPaymentFlowStep,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import { getAllPBelFlowStepsConfig } from "../../utils/pBelUtils/pBelFlowStepsConfig";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBelUtils/pBelPaymentFlowStepsConfig";
import { selectPBelFlowStep } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import useAppFlowController from "../useAppFlowController";

function usePBelAppFlowController() {
  const pBelFlowSteps = getAllPBelFlowStepsConfig();
  const pBelFlowStep = useSelector(selectPBelFlowStep);
  const pBelFlowNavigateToValue = useSelector(selectPBelFlowNavigateTo);

  const pBelPaymentFlowSteps = getAllPBelPaymentFlowStepsConfig();
  const pBelPaymentFlowStep = useSelector(selectPBelPaymentFlowStep);
  const pBelPaymentFlowNavigateToValue = useSelector(
    selectPBelPaymentFlowNavigateTo
  );

  const accessGranted = useAppFlowController(
    pBelFlowSteps,
    pBelFlowStep,
    pBelFlowNavigateToValue,
    pBelFlowNavigateTo,
    pBelFlowGoToFirstStep,
    pBelFlowGoToStep,
    pBelPaymentFlowSteps,
    pBelPaymentFlowStep,
    pBelPaymentFlowNavigateToValue,
    pBelPaymentFlowNavigateTo,
    pBelPaymentFlowGoToStep
  );

  return accessGranted;
}

export default usePBelAppFlowController;
