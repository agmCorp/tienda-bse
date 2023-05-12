import { useLocation } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  pBelFlowGoToFirstStep,
  pBelFlowInit,
} from "../../reduxToolkit/pBelFlowSlice";
import useAppFlowController from "../../hooks/useAppFlowController";
import { pBelPaymentFlowInit } from "../../reduxToolkit/pBelPaymentFlowSlice";

function PageNotFound() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Needed to navigate to home
  useAppFlowController();

  useEffect(() => {
    console.error("*** PAGE NOT FOUND", location.pathname);
    console.error("*** REDIRECTING TO FIRST STEP");
    dispatch(pBelFlowInit());
    dispatch(pBelPaymentFlowInit());
    dispatch(pBelFlowGoToFirstStep());
  }, [dispatch, location.pathname]);

  return <></>;
}

export default PageNotFound;
