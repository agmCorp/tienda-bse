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
} from "../../reduxToolkit/pBel/pBelFlowSlice";
import {
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowInit,
  pBelPaymentFlowNavigate,
  selectPBelPaymentFlowNavigate,
  selectPBelPaymentFlowStep,
} from "../../reduxToolkit/pBel/pBelPaymentFlowSlice";
import { getAllPBelFlowStepsConfig } from "../../utils/pBel/pBelFlowStepsConfig";
import { routeToStep } from "../../utils/stepsHelper";
import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBel/pBelPaymentFlowStepsConfig";

function useKK() {
  const pBelFlowSteps = getAllPBelFlowStepsConfig();
  const pBelPaymentFlowSteps = getAllPBelPaymentFlowStepsConfig();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [accessGranted, setAccessGranted] = useState(false);

  const pBelFlowStep = useSelector(selectPBelFlowStep);
  console.log("se ejecuta el hook y pBelFlowStep es: ", pBelFlowStep);
  const pBelFlowNavigation = useSelector(selectPBelFlowNavigate);

  const pBelPaymentFlowStep = useSelector(selectPBelPaymentFlowStep);
  const pBelPaymentFlowNavigation = useSelector(selectPBelPaymentFlowNavigate);

  // The pBelFlowStep only changes if a dispatch was executed before.
  // If there is a pending navigation, we navigate to the indicated route.
  useEffect(() => {
    if (pBelFlowNavigation.navigate) {
      navigate(pBelFlowNavigation.navigateTo);
      console.log("use1 navego a: ", pBelFlowNavigation.navigateTo);
      dispatch(pBelFlowNavigate({ navigate: false }));
    }
    console.log("use1 me ejecute");
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
      console.log("use2 navego a: ", pBelPaymentFlowNavigation.navigateTo);
      dispatch(pBelPaymentFlowNavigate({ navigate: false }));
    }
    console.log("use 2 me ejecute");
  }, [
    pBelPaymentFlowStep,
    navigate,
    dispatch,
    pBelPaymentFlowNavigation.navigate,
    pBelPaymentFlowNavigation.navigateTo,
  ]);

  useEffect(() => {
    // Aquí puedes realizar acciones cuando la ubicación cambie
    console.log("Ubicación actual:", location.pathname);
  }, [location]);

  useEffect(() => {
    const currentUrl = location.pathname;
    if (!pBelFlowNavigation.navigate && !pBelPaymentFlowNavigation.navigate) {
      console.log("use 3 inicio");
      // Steps that correspond to the current url
      const currentUrl = location.pathname;
      const urlPBelFlowStep = routeToStep(pBelFlowSteps, currentUrl);
      const urlPBelPPaymentFlowStep = routeToStep(
        pBelPaymentFlowSteps,
        currentUrl
      );
      console.log("currentUrl ", currentUrl);
      console.log("urlPBelFlowStep ", urlPBelFlowStep);
      console.log("urlPBelPPaymentFlowStep ", urlPBelPPaymentFlowStep);

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

export default useKK;
