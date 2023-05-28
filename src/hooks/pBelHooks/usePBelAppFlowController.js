import { useSelector } from "react-redux";

import {
  pBelFlowGoToStep,
  selectPBelFlowStep,
  selectPBelFlowNavigate,
  pBelFlowNavigate,
  pBelFlowGoToFirstStep,
  pBelFlowInit,
} from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import {
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowInit,
  pBelPaymentFlowNavigate,
  selectPBelPaymentFlowNavigate,
  selectPBelPaymentFlowStep,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import { getAllPBelFlowStepsConfig } from "../../utils/pBelUtils/pBelFlowStepsConfig";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBelUtils/pBelPaymentFlowStepsConfig";
import useAppFlowController from "../useAppFlowController";

function usePBelAppFlowController() {
  const pBelFlowSteps = getAllPBelFlowStepsConfig();
  const pBelPaymentFlowSteps = getAllPBelPaymentFlowStepsConfig();

  const pBelFlowStep = useSelector(selectPBelFlowStep);
  const pBelFlowNavigation = useSelector(selectPBelFlowNavigate);

  const pBelPaymentFlowStep = useSelector(selectPBelPaymentFlowStep);
  const pBelPaymentFlowNavigation = useSelector(selectPBelPaymentFlowNavigate);

  const accessGranted = useAppFlowController(
    pBelFlowNavigation,
    pBelPaymentFlowNavigation,
    pBelFlowStep,
    pBelFlowSteps,
    pBelFlowGoToStep,
    pBelFlowGoToFirstStep,
    pBelPaymentFlowStep,
    pBelPaymentFlowSteps,
    pBelPaymentFlowGoToStep,
    pBelFlowNavigate,
    pBelPaymentFlowNavigate,
    pBelFlowInit,
    pBelPaymentFlowInit
  );

  return accessGranted;
}

export default usePBelAppFlowController;
