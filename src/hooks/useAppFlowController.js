import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { routeToStep } from "../utils/stepsHelper";

function useAppFlowController(
  flowSteps,
  flowStep,
  flowNavigateToValue,
  flowNavigateTo,
  flowGoToFirstStep,
  flowGoToStep,
  paymentFlowSteps,
  paymentFlowStep,
  paymentFlowNavigateToValue,
  paymentFlowNavigateTo,
  paymentFlowGoToStep
) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accessGranted, setAccessGranted] = useState(false);

  // normalFlow: If there is a pending navigation, we navigate to the indicated route.
  useEffect(() => {
    if (flowNavigateToValue) {
      navigate(flowNavigateToValue);
      dispatch(flowNavigateTo({ navigateTo: "" }));
    }
  }, [dispatch, flowNavigateTo, flowNavigateToValue, navigate, accessGranted]);

  // paymentFlow: If there is a pending navigation, we navigate to the indicated route.
  useEffect(() => {
    if (paymentFlowNavigateToValue) {
      navigate(paymentFlowNavigateToValue);
      dispatch(paymentFlowNavigateTo({ navigateTo: "" }));
    }
  }, [
    dispatch,
    paymentFlowNavigateTo,
    paymentFlowNavigateToValue,
    navigate,
    accessGranted,
  ]);

  useEffect(() => {
    if (!accessGranted) {
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
    accessGranted,
    dispatch,
    flowGoToFirstStep,
    flowGoToStep,
    flowStep,
    flowSteps,
    paymentFlowGoToStep,
    paymentFlowStep,
    paymentFlowSteps,
  ]);

  return accessGranted;
}

export default useAppFlowController;
