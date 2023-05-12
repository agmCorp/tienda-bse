import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  pBelFlowGoToStep,
  selectPBelFlowStep,
  selectPBelFlowNavigate,
  pBelFlowNavigate,
  pBelFlowInit,
  pBelFlowGoToFirstStep,
} from "../reduxToolkit/pBelFlowSlice";
import {
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowInit,
  pBelPaymentFlowNavigate,
  selectPBelPaymentFlowNavigate,
  selectPBelPaymentFlowStep,
} from "../reduxToolkit/pBelPaymentFlowSlice";
import { getAllPBelFlowStepsConfig } from "../utils/pBelFlowStepsConfig";
import { routeToStep } from "../utils/stepsHelper";
import { getAllPBelPaymentFlowStepsConfig } from "../utils/pBelPaymentFlowStepsConfig";

function useAppFlowController() {
  const pBelFlowSteps = getAllPBelFlowStepsConfig();
  const pBelPaymentFlowSteps = getAllPBelPaymentFlowStepsConfig();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [accessGranted, setAccessGranted] = useState(false);

  const pBelFlowStep = useSelector(selectPBelFlowStep);
  const pBelFlowNavigation = useSelector(selectPBelFlowNavigate);

  const pBelPaymentFlowStep = useSelector(selectPBelPaymentFlowStep);
  const pBelPaymentFlowNavigation = useSelector(selectPBelPaymentFlowNavigate);

  // The pBelFlowStep only changes if a dispatch was executed before.
  // If there is a pending navigation, we navigate to the indicated route.
  useEffect(() => {
    if (pBelFlowNavigation.navigate) {
      navigate(pBelFlowNavigation.navigateTo);
      dispatch(pBelFlowNavigate({ navigate: false }));
    }
  }, [
    pBelFlowStep,
    navigate,
    dispatch,
    pBelFlowNavigation.navigate,
    pBelFlowNavigation.navigateTo,
  ]);

  // The pBelPaymentFlowStep only changes if a dispatch was executed before.
  // If there is a pending navigation, we navigate to the indicated route.
  useEffect(() => {
    if (pBelPaymentFlowNavigation.navigate) {
      navigate(pBelPaymentFlowNavigation.navigateTo);
      dispatch(pBelPaymentFlowNavigate({ navigate: false }));
    }
  }, [
    pBelPaymentFlowStep,
    navigate,
    dispatch,
    pBelPaymentFlowNavigation.navigate,
    pBelPaymentFlowNavigation.navigateTo,
  ]);

  useEffect(() => {
    if (!pBelFlowNavigation.navigate && !pBelPaymentFlowNavigation.navigate) {
      // Steps that correspond to the current url
      const currentUrl = location.pathname;
      const urlPBelFlowStep = routeToStep(pBelFlowSteps, currentUrl);
      const urlPBelPPaymentFlowStep = routeToStep(
        pBelPaymentFlowSteps,
        currentUrl
      );

      if (urlPBelFlowStep > 0 || urlPBelPPaymentFlowStep > 0) {
        // The current url is inside the payment flow
        if (urlPBelPPaymentFlowStep > 0) {
          if (pBelPaymentFlowStep > urlPBelPPaymentFlowStep) {
            console.log("*** ACCESS GRANTED TO", currentUrl);
            dispatch(pBelPaymentFlowGoToStep(urlPBelPPaymentFlowStep));
            setAccessGranted(true);
          } else {
            if (pBelPaymentFlowStep < urlPBelPPaymentFlowStep) {
              console.log("*** ACCESS DENIED TO", currentUrl);
              dispatch(pBelFlowInit());
              dispatch(pBelPaymentFlowInit());
              dispatch(pBelFlowGoToFirstStep());
              setAccessGranted(false);
            } else {
              // We are already there
              console.log("*** ACCESS GRANTED TO", currentUrl);
              setAccessGranted(true);
            }
          }
        } else {
          // The current url is inside the pBel flow
          dispatch(pBelPaymentFlowInit());
          if (pBelFlowStep > urlPBelFlowStep) {
            console.log("*** ACCESS GRANTED TO", currentUrl);
            dispatch(pBelFlowGoToStep(urlPBelFlowStep));
            setAccessGranted(true);
          } else {
            if (pBelFlowStep < urlPBelFlowStep) {
              console.log("*** ACCESS DENIED TO", currentUrl);
              dispatch(pBelFlowInit());
              dispatch(pBelFlowGoToFirstStep());
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
    pBelFlowSteps,
    pBelPaymentFlowSteps,
    pBelFlowNavigation.navigate,
    pBelFlowStep,
    dispatch,
    location.pathname,
    pBelPaymentFlowNavigation.navigate,
    pBelPaymentFlowStep,
  ]);

  return accessGranted;
}

export default useAppFlowController;
