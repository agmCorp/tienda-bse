import { createSlice } from "@reduxjs/toolkit";

import { P_BEL_FLOW_ROUTE_BASIC_DATA } from "../routes/routes";
import { getAllPBelFlowStepsConfig } from "../utils/pBelFlowStepsConfig";
import {
  getFirstRoute,
  getFirstStep,
  getLastStep,
  stepToRoute,
} from "../utils/stepsHelper";
import { pBelPaymentFlowStepCompleted } from "./pBelPaymentFlowSlice";

const initialState = {
  step: 1,
  navigate: true,
  navigateTo: P_BEL_FLOW_ROUTE_BASIC_DATA,
  quoteInfo: {},
  selectedData: {},
};

const pBelFlowSlice = createSlice({
  name: "pBelFlow",
  initialState,
  reducers: {
    pBelFlowStepCompleted: (state, action) => {
      const steps = getAllPBelFlowStepsConfig();
      if (state.step < steps.length) {
        state.step += 1;
        state.navigate = true;
        state.navigateTo = stepToRoute(steps, state.step);
        state.selectedData = { ...state.selectedData, ...action.payload };
      } else {
        state.navigate = false;
        state.navigateTo = "";
      }
    },
    pBelFlowGoToStep: (state, action) => {
      const steps = getAllPBelFlowStepsConfig();
      if (0 < action.payload && action.payload <= steps.length) {
        state.step = action.payload;
        state.navigate = true;
        state.navigateTo = stepToRoute(steps, state.step);
      } else {
        state.navigate = false;
        state.navigateTo = "";
      }
    },
    pBelFlowGoToFirstStep: (state) => {
      state.step = getFirstStep();
      state.navigate = true;
      state.navigateTo = getFirstRoute(getAllPBelFlowStepsConfig());
    },
    pBelFlowInit: (state) => {
      state.step = 0;
      state.navigate = false;
      state.navigateTo = "";
      state.quoteInfo = {};
      state.selectedData = {};
    },
    pBelFlowNavigate: (state, action) => {
      state.navigate = action.payload.navigate;
      state.navigateTo = action.payload.navigate
        ? action.payload.navigateTo
        : "";
    },
    addQuoteInfo: (state, action) => {
      state.quoteInfo = { ...state.quoteInfo, ...action.payload };
    },
    addSelectedData: (state, action) => {
      state.selectedData = { ...state.selectedData, ...action.payload };
    },
  },
});

const {
  pBelFlowStepCompleted,
  pBelFlowGoToStep,
  pBelFlowGoToFirstStep,
  pBelFlowInit,
  pBelFlowNavigate,
  addQuoteInfo,
  addSelectedData,
} = pBelFlowSlice.actions;

const pBelFlowStepCompletedThunk = (data) => (dispatch, getState) => {
  const { pBelFlow } = getState();

  if (pBelFlow.step === getLastStep(getAllPBelFlowStepsConfig())) {
    dispatch(addSelectedData(data));
    dispatch(pBelPaymentFlowStepCompleted());
  } else {
    dispatch(pBelFlowStepCompleted(data));
  }
};

// Selectors
const selectPBelFlowStep = (state) => state.pBelFlow.step;
const selectPBelFlowNavigate = (state) => {
  return {
    navigate: state.pBelFlow.navigate,
    navigateTo: state.pBelFlow.navigateTo,
  };
};
const selectPBelFlowQuoteInfo = (state) => state.pBelFlow.quoteInfo;
const selectPBelFlowSelectedData = (state) => state.pBelFlow.selectedData;

export default pBelFlowSlice.reducer;
export {
  selectPBelFlowStep,
  selectPBelFlowNavigate,
  selectPBelFlowQuoteInfo,
  selectPBelFlowSelectedData,
  pBelFlowSlice,
  pBelFlowStepCompletedThunk,
  pBelFlowGoToStep,
  pBelFlowGoToFirstStep,
  pBelFlowInit,
  pBelFlowNavigate,
  addQuoteInfo,
};
