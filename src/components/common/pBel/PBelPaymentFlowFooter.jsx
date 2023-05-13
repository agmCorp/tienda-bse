import { useDispatch } from "react-redux";
import { pBelPaymentFlowStepCompleted } from "../../../reduxToolkit/pBel/pBelPaymentFlowSlice";

import logoBSE from "../../../images/bse-logo-negative.png";
import Footer from "../Footer";

function PBelPaymentFlowFooter() {
  const dispatch = useDispatch();

  const handle = () => {
    dispatch(pBelPaymentFlowStepCompleted());
  };

  return (
    <>
      PBelFlowFooter
      <input type="button" onClick={handle} value="siguiente" />
      <Footer
        bgColor="bg-blue-800"
        logo={logoBSE}
        heightLogo="h-2rem"
        hoverTextColor="text-primary"
      />
    </>
  );
}

export default PBelPaymentFlowFooter;
