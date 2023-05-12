// import logoBikeBSE from "../../images/bike-bse-logo.png";
// import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { pBelFlowStepCompletedThunk } from "../../../reduxToolkit/pBel/pBelFlowSlice";

function PBelFlowFooter() {
  const dispatch = useDispatch();

  const handle = () => {
    dispatch(pBelFlowStepCompletedThunk());
  };

  return (
    <>
      <input type="button" onClick={handle} value="siguiente" />
    </>
  );
}

export default PBelFlowFooter;

//<>PBelFlowFooter </>
// <Footer
//   bgColor="bg-cyan-900"
//   logo={logoBikeBSE}
//   heightLogo="h-7rem"
//   hoverTextColor="text-primary"
// />
