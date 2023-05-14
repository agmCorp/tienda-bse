// AGM 05/23
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  pBelFlowGoToFirstStep,
  pBelFlowInit,
} from "../../reduxToolkit/pBel/pBelFlowSlice";
import usePBelAppFlowController from "../../hooks/pBel/usePBelAppFlowController";
import { pBelPaymentFlowInit } from "../../reduxToolkit/pBel/pBelPaymentFlowSlice";

function PBelPageNotFound() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Needed to navigate to home
  usePBelAppFlowController();

  useEffect(() => {
    console.log("*** PAGE NOT FOUND", location.pathname);
    console.log("*** REDIRECTING TO FIRST STEP");
    dispatch(pBelFlowInit());
    dispatch(pBelPaymentFlowInit());
    dispatch(pBelFlowGoToFirstStep());
  }, [dispatch, location.pathname]);

  return <></>;
}

export default PBelPageNotFound;
