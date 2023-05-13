import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { routeToStep } from "../utils/stepsHelper";

function useAppFlowController(
  flowNavigation,
  paymentFlowNavigation,
  flowStep,
  flowSteps,
  flowGoToStep,
  flowGoToFirstStep,
  flowInit,
  paymentFlowStep,
  paymentFlowSteps,
  paymentFlowGoToStep,
  paymentFlowInit,
  flowNavigate,
  paymentFlowNavigate
) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [accessGranted, setAccessGranted] = useState(false);

  // The pBelFlowStep only changes if a dispatch was executed before.
  // If there is a pending navigation, we navigate to the indicated route.
  useEffect(() => {
    if (flowNavigation.navigate) {
      navigate(flowNavigation.navigateTo);
      dispatch(flowNavigate({ navigate: false }));
    }
  }, [
    flowStep,
    navigate,
    dispatch,
    flowNavigation.navigate,
    flowNavigation.navigateTo,
    flowNavigate,
  ]);

  // The pBelPaymentFlowStep only changes if a dispatch was executed before.
  // If there is a pending navigation, we navigate to the indicated route.
  useEffect(() => {
    if (paymentFlowNavigation.navigate) {
      navigate(paymentFlowNavigation.navigateTo);
      dispatch(paymentFlowNavigate({ navigate: false }));
    }
  }, [
    paymentFlowStep,
    navigate,
    dispatch,
    paymentFlowNavigation.navigate,
    paymentFlowNavigation.navigateTo,
    paymentFlowNavigate,
  ]);

  useEffect(() => {
    if (!flowNavigation.navigate && !paymentFlowNavigation.navigate) {
      // Steps that correspond to the current url
      const currentUrl = location.pathname;
      const urlPBelFlowStep = routeToStep(flowSteps, currentUrl);
      const urlPBelPPaymentFlowStep = routeToStep(paymentFlowSteps, currentUrl);

      if (urlPBelFlowStep > 0 || urlPBelPPaymentFlowStep > 0) {
        // The current url is inside the payment flow
        if (urlPBelPPaymentFlowStep > 0) {
          if (paymentFlowStep > urlPBelPPaymentFlowStep) {
            console.log("*** ACCESS GRANTED TO", currentUrl);
            dispatch(paymentFlowGoToStep(urlPBelPPaymentFlowStep));
            setAccessGranted(true);
          } else {
            if (paymentFlowStep < urlPBelPPaymentFlowStep) {
              console.log("*** ACCESS DENIED TO", currentUrl);
              dispatch(flowInit());
              dispatch(paymentFlowInit());
              dispatch(flowGoToFirstStep());
              setAccessGranted(false);
            } else {
              // We are already there
              console.log("*** ACCESS GRANTED TO", currentUrl);
              setAccessGranted(true);
            }
          }
        } else {
          // The current url is inside the pBel flow
          dispatch(paymentFlowInit());
          if (flowStep > urlPBelFlowStep) {
            console.log("*** ACCESS GRANTED TO", currentUrl);
            dispatch(flowGoToStep(urlPBelFlowStep));
            setAccessGranted(true);
          } else {
            if (flowStep < urlPBelFlowStep) {
              console.log("*** ACCESS DENIED TO", currentUrl);
              dispatch(flowInit());
              dispatch(flowGoToFirstStep());
              setAccessGranted(false);
            } else {
              // We are already there
              console.log("*** ACCESS GRANTED TO", currentUrl);
              setAccessGranted(true);
            }
          }
        }
      } else {
        // Page not found
        setAccessGranted(false);
        console.log("*** ACCESS DENIED TO", currentUrl);
      }
    }
  }, [
    flowSteps,
    paymentFlowSteps,
    flowNavigation.navigate,
    flowStep,
    dispatch,
    location.pathname,
    paymentFlowNavigation.navigate,
    paymentFlowStep,
    flowGoToFirstStep,
    flowGoToStep,
    flowInit,
    paymentFlowGoToStep,
    paymentFlowInit,
  ]);

  return accessGranted;
}

export default useAppFlowController;
