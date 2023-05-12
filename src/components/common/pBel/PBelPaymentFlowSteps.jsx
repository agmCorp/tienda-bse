import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";

import styles from "./PBelPaymentFlowSteps.module.css";
import {
  selectPBelPaymentFlowStep,
  pBelPaymentFlowGoToStep,
} from "../../../reduxToolkit/pBel/pBelPaymentFlowSlice";
import { getAllPBelPaymentFlowStepsConfig } from "../../../utils/pBel/pBelPaymentFlowStepsConfig";

function PBelPaymentFlowSteps() {
  const step = useSelector(selectPBelPaymentFlowStep);
  const dispatch = useDispatch();

  const handleClick = (stepValue) => {
    dispatch(pBelPaymentFlowGoToStep(stepValue));
  };

  const previousStepButton = (stepValue, description) => {
    return (
      <>
        <Button
          icon="pi pi-check"
          className="p-button-rounded p-button-outlined p-button-secondary bg-white hover:text-white hover:bg-blue-500"
          onClick={() => handleClick(stepValue)}
        />
        <span
          className="text-secondary mx-2 cursor-pointer hover:text-blue-500"
          onClick={() => handleClick(stepValue)}
        >
          {description}
        </span>
      </>
    );
  };

  const currentStepButton = (label, description) => {
    return (
      <>
        <Button
          disabled
          label={label}
          className="p-button-rounded p-button-info opacity-100"
        />
        <span className="text-blue-500 mx-2">{description}</span>
      </>
    );
  };

  const nextStepButton = (label, description) => {
    return (
      <>
        <Button
          disabled
          label={label}
          className="p-button-rounded p-button-outlined p-button-info bg-white opacity-100"
        />
        <span className="text-blue-500 mx-2">{description}</span>
      </>
    );
  };

  const steps = getAllPBelPaymentFlowStepsConfig().map((stepConfig, index) => (
    <div
      key={index}
      className="flex flex-row align-items-center md:flex-column md:text-center"
    >
      {index + 1 < step
        ? previousStepButton(index + 1, stepConfig.description)
        : index + 1 > step
        ? nextStepButton(stepConfig.label, stepConfig.description)
        : currentStepButton(stepConfig.label, stepConfig.description)}
    </div>
  ));

  return (
    <>
      {/* Visible on a Small Screen */}
      <div className="md:hidden">
        <div
          className={`flex flex-column justify-content-evenly ${styles["line-y"]} h-18rem`}
        >
          {steps}
        </div>
      </div>
      {/* Not visible on a Small Screen */}
      <div
        className={`hidden md:flex md:flex-row ${styles["line-x"]} md:justify-content-around`}
      >
        {steps}
      </div>
    </>
  );
}

export default PBelPaymentFlowSteps;
