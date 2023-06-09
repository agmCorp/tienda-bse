import { useDispatch, useSelector } from "react-redux";

import PBelFlowSteps from "./PBelFlowSteps";
import usePBelAppFlowController from "../../../hooks/pBelHooks/usePBelAppFlowController";
import PBelFlowHeader from "./PBelFlowHeader";
import PBelFlowFooter from "./PBelFlowFooter";
import {
  pBelFlowGoToFirstStep,
  selectPBelFlowStep,
} from "../../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { getFirstStep } from "../../../utils/stepsHelper";
import Detail from "../../pBelInsQuote/Detail";

function PBelFlowLayout({ children }) {
  const accessGranted = usePBelAppFlowController();

  const dispatch = useDispatch();
  const pBelFlowStep = useSelector(selectPBelFlowStep);

  const handleOnClick = () => {
    dispatch(pBelFlowGoToFirstStep());
  };

  return (
    <>
      {accessGranted && (
        <div className="bg-blue-50">
          <PBelFlowHeader init={handleOnClick} />
          <div className="mx-auto my-5 shadow-4 p-4 w-11 md:w-6 border-round bg-white">
            <PBelFlowSteps />
            <div className="mt-3">
              <Detail />
            </div>
            <div className="mt-3">{children}</div>
            {pBelFlowStep > getFirstStep() && (
              <div className="text-500 font-medium mt-3">
                <span
                  onClick={handleOnClick}
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
