import { createSlice } from "@reduxjs/toolkit";

import { P_BEL_FLOW_ROUTE_BASIC_DATA } from "../../routes/pBelRoutes/pBelRoutes";
import { getAllPBelFlowStepsConfig } from "../../utils/pBelUtils/pBelFlowStepsConfig";
import {
  getFirstRoute,
  getFirstStep,
  getLastStep,
  stepToRoute,
} from "../../utils/stepsHelper";
import { pBelPaymentFlowStepCompleted } from "./pBelPaymentFlowSlice";

const initialState = {
  step: 1,
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
        state.navigateTo = stepToRoute(steps, state.step);
        state.selectedData = { ...state.selectedData, ...action.payload };
      } else {
        state.navigateTo = "";
      }
    },
    pBelFlowGoToStep: (state, action) => {
      const steps = getAllPBelFlowStepsConfig();
      if (0 < action.payload && action.payload <= steps.length) {
        state.step = action.payload;
        state.navigateTo = stepToRoute(steps, state.step);
      } else {
        state.navigateTo = "";
      }
    },
    pBelFlowGoToFirstStep: (state) => {
      state.step = getFirstStep();
      state.navigateTo = getFirstRoute(getAllPBelFlowStepsConfig());
    },
    pBelFlowClear: (state) => {
      state.step = getFirstStep();
      state.navigateTo = "";
      state.quoteInfo = {};
      state.selectedData = {};
    },
    pBelFlowInit: (state) => {
      state.step = 0;
      state.navigateTo = "";
      state.quoteInfo = {};
      state.selectedData = {};
    },
    pBelFlowNavigateTo: (state, action) => {
      state.navigateTo = action.payload.navigateTo;
    },
    pBelAddQuoteInfo: (state, action) => {
      state.quoteInfo = { ...state.quoteInfo, ...action.payload };
    },
    pBelAddSelectedData: (state, action) => {
      state.selectedData = { ...state.selectedData, ...action.payload };
    },
  },
});

const {
  pBelFlowStepCompleted,
  pBelFlowGoToStep,
  pBelFlowGoToFirstStep,
  pBelFlowClear,
  pBelFlowInit,
  pBelFlowNavigateTo,
  pBelAddQuoteInfo,
  pBelAddSelectedData,
} = pBelFlowSlice.actions;

const pBelFlowStepCompletedThunk = (data) => (dispatch, getState) => {
  const { pBelFlow } = getState();

  if (pBelFlow.step === getLastStep(getAllPBelFlowStepsConfig())) {
    dispatch(pBelAddSelectedData(data));
    dispatch(pBelPaymentFlowStepCompleted());
  } else {
    dispatch(pBelFlowStepCompleted(data));
  }
};

// Selectors
const selectPBelFlowStep = (state) => state.pBelFlow.step;
const selectPBelFlowNavigateTo = (state) => state.pBelFlow.navigateTo;
const selectPBelFlowQuoteInfo = (state) => state.pBelFlow.quoteInfo;
const selectPBelFlowSelectedData = (state) => state.pBelFlow.selectedData;

export default pBelFlowSlice.reducer;
export {
  selectPBelFlowStep,
  selectPBelFlowNavigateTo,
  selectPBelFlowQuoteInfo,
  selectPBelFlowSelectedData,
  pBelFlowSlice,
  pBelFlowStepCompletedThunk,
  pBelFlowGoToStep,
  pBelFlowGoToFirstStep,
  pBelFlowClear,
  pBelFlowInit,
  pBelFlowNavigateTo,
  pBelAddQuoteInfo,
};
