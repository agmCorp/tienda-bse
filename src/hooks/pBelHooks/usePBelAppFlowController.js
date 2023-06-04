import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectPBelFlowNavigateTo } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { pBelFlowNavigateTo } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import {
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowInit,
  pBelPaymentFlowNavigateTo,
  selectPBelPaymentFlowNavigateTo,
  selectPBelPaymentFlowStep,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import { routeToStep } from "../../utils/stepsHelper";
import { getAllPBelFlowStepsConfig } from "../../utils/pBelUtils/pBelFlowStepsConfig";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBelUtils/pBelPaymentFlowStepsConfig";
import { selectPBelFlowStep } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { pBelFlowInit } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { pBelFlowGoToFirstStep } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { pBelFlowGoToStep } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";

function usePBelAppFlowController() {
  // particular
  const flowNavigateToValue = useSelector(selectPBelFlowNavigateTo);
  const flowNavigateTo = pBelFlowNavigateTo;

  const paymentFlowNavigateToValue = useSelector(
    selectPBelPaymentFlowNavigateTo
  );
  const paymentFlowNavigateTo = pBelPaymentFlowNavigateTo;
  const flowSteps = getAllPBelFlowStepsConfig();
  const paymentFlowSteps = getAllPBelPaymentFlowStepsConfig();

  const flowStep = useSelector(selectPBelFlowStep);
  const paymentFlowStep = useSelector(selectPBelPaymentFlowStep);
  const flowInit = pBelFlowInit;
  const paymentFlowInit = pBelPaymentFlowInit;
  const flowGoToFirstStep = pBelFlowGoToFirstStep;
  const flowGoToStep = pBelFlowGoToStep;
  const paymentFlowGoToStep = pBelPaymentFlowGoToStep;
  // fin particular

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
    accessGranted,
    dispatch,
    flowGoToFirstStep,
    flowGoToStep,
    flowInit,
    flowStep,
    flowSteps,
    paymentFlowGoToStep,
    paymentFlowInit,
    paymentFlowStep,
    paymentFlowSteps,
  ]);

  return accessGranted;
}

export default usePBelAppFlowController;
