import { useDispatch } from "react-redux";
import { pBelFlowStepCompletedThunk } from "../../../reduxToolkit/pBel/pBelFlowSlice";

import logoBSE from "../../../images/bse-logo-negative.png";
import Footer from "../Footer";
import styles from "./PBelFlowFooter.module.css";

function PBelFlowFooter() {
  const dispatch = useDispatch();

  const handle = () => {
    dispatch(pBelFlowStepCompletedThunk());
  };

  return (
    <>
      PBelFlowFooter
      <input type="button" onClick={handle} value="siguiente" />
      <Footer
        bgColor={styles["bg-color-footer"]}
        logo={logoBSE}
        heightLogo="h-2rem"
        hoverTextColor="text-primary"
      />
    </>
  );
}

export default PBelFlowFooter;
