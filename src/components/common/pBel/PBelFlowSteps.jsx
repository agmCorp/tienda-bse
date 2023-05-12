import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";

import styles from "./PBelFlowSteps.module.css";
import {
  selectPBelFlowStep,
  pBelFlowGoToStep,
} from "../../../reduxToolkit/pBelFlowSlice";
import { getAllPBelFlowStepsConfig } from "../../../utils/pBelFlowStepsConfig";

function PBelFlowSteps() {
  const step = useSelector(selectPBelFlowStep);
  const dispatch = useDispatch();

  const handleClick = (stepValue) => {
    dispatch(pBelFlowGoToStep(stepValue));
  };

  const previousStepButton = (stepValue, description) => {
    return (
      <>
        <Button
          icon="pi pi-check"
          className="p-button-rounded p-button-outlined p-button-secondary bg-white hover:text-white hover:bg-primary"
          onClick={() => handleClick(stepValue)}
        />
        <span
          className="text-secondary mx-2 cursor-pointer hover:text-primary"
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
          className="p-button-rounded opacity-100"
        />
        <span className="text-primary mx-2">{description}</span>
      </>
    );
  };

  const nextStepButton = (secured, label, description) => {
    return (
      <>
        {secured ? (
          <Button
            disabled
            icon="pi pi-lock"
            className="p-button-rounded p-button-outlined bg-white opacity-100"
          />
        ) : (
          <Button
            disabled
            label={label}
            className="p-button-rounded p-button-outlined bg-white opacity-100"
          />
        )}
        <span className="text-primary mx-2">{description}</span>
      </>
    );
  };

  const steps = getAllPBelFlowStepsConfig().map((stepConfig, index) => (
    <div
      key={index}
      className="flex flex-row align-items-center md:flex-column md:text-center"
    >
      {index + 1 < step
        ? previousStepButton(index + 1, stepConfig.description)
        : index + 1 > step
        ? nextStepButton(
            stepConfig.secured,
            stepConfig.label,
            stepConfig.description
          )
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

export default PBelFlowSteps;
