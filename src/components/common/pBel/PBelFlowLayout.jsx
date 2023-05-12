import { useDispatch, useSelector } from "react-redux";

import PBelFlowSteps from "./PBelFlowSteps";
import useAppFlowController from "../../../hooks/useAppFlowController";
// import Detail from "../../pBelInsQuote/Detail";
import PBelFlowHeader from "./PBelFlowHeader";
import PBelFlowFooter from "./PBelFlowFooter";
import {
  pBelFlowGoToFirstStep,
  selectPBelFlowStep,
} from "../../../reduxToolkit/pBelFlowSlice";
import { getFirstStep } from "../../../utils/stepsHelper";

function PBelFlowLayout({ children }) {
  const accessGranted = useAppFlowController();

  const dispatch = useDispatch();
  const pBelFlowStep = useSelector(selectPBelFlowStep);

  const handleClick = () => {
    dispatch(pBelFlowGoToFirstStep());
  };

  return (
    <>
      {accessGranted && (
        <div className="bg-green-50">
          <PBelFlowHeader />
          <div className="mx-auto my-5 shadow-4 p-4 w-11 md:w-6 border-round bg-white">
            <PBelFlowSteps />
            <div className="mt-3">
              DETAIL FIGURABA ACA, NO SE QUE ES
              {/* <Detail /> */}
            </div>
            <div className="mt-3">{children}</div>
            {pBelFlowStep > getFirstStep() && (
              <div className="text-500 font-medium mt-3">
                <span
                  onClick={handleClick}
                  className="cursor-pointer hover:text-primary"
                >
                  <i className="pi pi-angle-double-left mr-2" />
                  Inicio
                </span>
              </div>
            )}
          </div>
          <PBelFlowFooter />
        </div>
      )}
    </>
  );
}

export default PBelFlowLayout;
