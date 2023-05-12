import { useDispatch, useSelector } from "react-redux";

import PBelPaymentFlowSteps from "./PBelPaymentFlowSteps";
import useAppFlowController from "../../../hooks/useAppFlowController";
import PBelPaymentFlowHeader from "./PBelPaymentFlowHeader";
import PBelPaymentFlowFooter from "./PBelPaymentFlowFooter";
import { pBelFlowGoToFirstStep } from "../../../reduxToolkit/pBelFlowSlice";
import { selectPBelPaymentFlowStep } from "../../../reduxToolkit/pBelPaymentFlowSlice";
import { getLastStep } from "../../../utils/stepsHelper";
import { getAllPBelPaymentFlowStepsConfig } from "../../../utils/pBelPaymentFlowStepsConfig";

function PBelPaymentFlowLayout({ children }) {
  const accessGranted = useAppFlowController();

  const dispatch = useDispatch();
  const pBelPaymentFlowStep = useSelector(selectPBelPaymentFlowStep);

  const handleClick = () => {
    dispatch(pBelFlowGoToFirstStep());
  };

  return (
    <>
      {accessGranted && (
        <div className="bg-blue-50">
          <PBelPaymentFlowHeader />
          <div className="mx-auto my-5 shadow-4 p-4 w-11 md:w-6 border-round bg-white">
            <PBelPaymentFlowSteps />
            <div className="mt-3">{children}</div>
            {pBelPaymentFlowStep <
              getLastStep(getAllPBelPaymentFlowStepsConfig()) && (
              <div className="text-500 font-medium mt-3">
                <span
                  onClick={handleClick}
                  className="cursor-pointer hover:text-blue-500"
                >
                  <i className="pi pi-angle-double-left mr-2" />
                  Inicio
                </span>
              </div>
            )}
          </div>
          <PBelPaymentFlowFooter />
        </div>
      )}
    </>
  );
}

export default PBelPaymentFlowLayout;
