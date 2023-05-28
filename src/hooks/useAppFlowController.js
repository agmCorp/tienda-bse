import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getFirstStep, routeToStep } from "../utils/stepsHelper";

function useAppFlowController(
  flowNavigation,
  paymentFlowNavigation,
  flowStep,
  flowSteps,
  flowGoToStep,
  flowGoToFirstStep,
  paymentFlowStep,
  paymentFlowSteps,
  paymentFlowGoToStep,
  flowNavigate,
  paymentFlowNavigate,
  flowInit,
  paymentFlowInit
) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accessGranted, setAccessGranted] = useState(false);

  // The flowStep only changes if a dispatch was executed before.
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

  // The paymentFlowStep only changes if a dispatch was executed before.
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
      const url = new URL(window.location.href);
      let currentUrl = url.pathname;
      let urlFlowStep = 0;
      let urlPaymentFlowStep = 0;

      const searchString = process.env.PUBLIC_URL;
      const index = currentUrl.indexOf(searchString);

      if (index !== -1) {
        currentUrl = currentUrl.substring(index + searchString.length);
        urlFlowStep = routeToStep(flowSteps, currentUrl);
        urlPaymentFlowStep = routeToStep(paymentFlowSteps, currentUrl);
      }

      // Steps that correspond to the current url
      if (urlFlowStep > 0 || urlPaymentFlowStep > 0) {
        // The current url is inside the normal flow
        if (urlFlowStep > 0) {
          if (paymentFlowStep > 0) {
            // It's not allowed to go from the payment flow to the normal flow.
            console.log("*** ACCESS DENIED TO", currentUrl);
            dispatch(flowInit());
            dispatch(paymentFlowInit());
            dispatch(flowGoToFirstStep());
            setAccessGranted(false);
          } else {
            if (flowStep > urlFlowStep) {
              console.log("*** ACCESS GRANTED TO", currentUrl);
              dispatch(flowGoToStep(urlFlowStep));
              setAccessGranted(true);
            } else {
              if (flowStep < urlFlowStep) {
                console.log("*** ACCESS DENIED TO", currentUrl);
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
          // The current url is inside the payment flow
          if (paymentFlowStep > urlPaymentFlowStep) {
            console.log("*** ACCESS GRANTED TO", currentUrl);
            dispatch(paymentFlowGoToStep(urlPaymentFlowStep));
            setAccessGranted(true);
          } else {
            if (paymentFlowStep < urlPaymentFlowStep) {
              console.log("*** ACCESS DENIED TO", currentUrl);
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
    paymentFlowNavigation.navigate,
    paymentFlowStep,
    flowGoToFirstStep,
    flowGoToStep,
    paymentFlowGoToStep,
    flowInit,
    paymentFlowInit,
  ]);

  return accessGranted;
}

export default useAppFlowController;
