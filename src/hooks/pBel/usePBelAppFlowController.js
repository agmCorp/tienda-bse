import { useSelector } from "react-redux";

import {
  pBelFlowGoToStep,
  selectPBelFlowStep,
  selectPBelFlowNavigate,
  pBelFlowNavigate,
  pBelFlowInit,
  pBelFlowGoToFirstStep,
} from "../../reduxToolkit/pBel/pBelFlowSlice";
import {
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowInit,
  pBelPaymentFlowNavigate,
  selectPBelPaymentFlowNavigate,
  selectPBelPaymentFlowStep,
} from "../../reduxToolkit/pBel/pBelPaymentFlowSlice";
import { getAllPBelFlowStepsConfig } from "../../utils/pBel/pBelFlowStepsConfig";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBel/pBelPaymentFlowStepsConfig";
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
    pBelFlowInit,
    pBelPaymentFlowStep,
    pBelPaymentFlowSteps,
    pBelPaymentFlowGoToStep,
    pBelPaymentFlowInit,
    pBelFlowNavigate,
    pBelPaymentFlowNavigate
  );

  return accessGranted;
}

export default usePBelAppFlowController;
