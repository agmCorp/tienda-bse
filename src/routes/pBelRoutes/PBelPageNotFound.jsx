import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pBelFlowGoToFirstStep } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import usePBelAppFlowController from "../../hooks/pBelHooks/usePBelAppFlowController";

function PBelPageNotFound() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Needed to navigate to home
  usePBelAppFlowController();

  useEffect(() => {
    console.log("*** PAGE NOT FOUND", location.pathname);
    console.log("*** REDIRECTING TO FIRST STEP");
    dispatch(pBelFlowGoToFirstStep());
  }, [dispatch, location.pathname]);

  return <></>;
}

export default PBelPageNotFound;
