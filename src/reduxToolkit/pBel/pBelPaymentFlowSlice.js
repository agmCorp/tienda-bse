import { createSlice } from "@reduxjs/toolkit";

import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBel/pBelPaymentFlowStepsConfig";
import { stepToRoute } from "../../utils/stepsHelper";

const initialState = {
  step: 0,
  navigate: false,
  navigateTo: "",
  issueInfo: {},
  invoiceInfo: {},
  invoiceDetail: {},
  selectedData: {},
  comeFromSpe: false,
};

const pBelPaymentFlowSlice = createSlice({
  name: "pBelPaymentFlow",
  initialState,
  reducers: {
    pBelPaymentFlowStepCompleted: (state, action) => {
      const steps = getAllPBelPaymentFlowStepsConfig();
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
    pBelPaymentFlowGoToStep: (state, action) => {
      const steps = getAllPBelPaymentFlowStepsConfig();
      if (0 < action.payload && action.payload <= steps.length) {
        state.step = action.payload;
        state.navigate = true;
        state.navigateTo = stepToRoute(steps, state.step);
      } else {
        state.navigate = false;
        state.navigateTo = "";
      }
    },
    pBelPaymentFlowInit: (state) => {
      state.step = 0;
      state.navigate = false;
      state.navigateTo = "";
      state.issueInfo = {};
      state.invoiceInfo = {};
      state.invoiceDetail = {};
      state.selectedData = {};
      state.comeFromSpe = false;
    },
    pBelPaymentFlowNavigate: (state, action) => {
      state.navigate = action.payload.navigate;
      state.navigateTo = action.payload.navigate
        ? action.payload.navigateTo
        : "";
    },
    pBelAddIssueInfo: (state, action) => {
      state.issueInfo = action.payload;
    },
    pBelAddInvoiceInfo: (state, action) => {
      state.invoiceInfo = action.payload;
    },
    pBelAddInvoiceDetail: (state, action) => {
      state.invoiceDetail = action.payload;
    },
    setComeFromSpe: (state, action) => {
      state.comeFromSpe = action.payload;
    },
  },
});

const {
  pBelPaymentFlowStepCompleted,
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowInit,
  pBelPaymentFlowNavigate,
  pBelAddIssueInfo,
  pBelAddInvoiceInfo,
  pBelAddInvoiceDetail,
  setComeFromSpe,
} = pBelPaymentFlowSlice.actions;

// Selectors
const selectPBelPaymentFlowStep = (state) => state.pBelPaymentFlow.step;
const selectPBelPaymentFlowNavigate = (state) => {
  return {
    navigate: state.pBelPaymentFlow.navigate,
    navigateTo: state.pBelPaymentFlow.navigateTo,
  };
};
const selectPBelPaymentFlowIssueInfo = (state) =>
  state.pBelPaymentFlow.issueInfo;
const selectPBelPaymentFlowInvoiceInfo = (state) =>
  state.pBelPaymentFlow.invoiceInfo;
const selectPBelPaymentFlowInvoiceDetail = (state) =>
  state.pBelPaymentFlow.invoiceDetail;
const selectPBelPaymentFlowSelectedData = (state) =>
  state.pBelPaymentFlow.selectedData;
const selectComeFromSpe = (state) => state.pBelPaymentFlow.comeFromSpe;

export default pBelPaymentFlowSlice.reducer;
export {
  selectPBelPaymentFlowStep,
  selectPBelPaymentFlowNavigate,
  selectPBelPaymentFlowIssueInfo,
  selectPBelPaymentFlowInvoiceInfo,
  selectPBelPaymentFlowInvoiceDetail,
  selectPBelPaymentFlowSelectedData,
  selectComeFromSpe,
  pBelPaymentFlowSlice,
  pBelPaymentFlowStepCompleted,
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowInit,
  pBelPaymentFlowNavigate,
  pBelAddIssueInfo,
  pBelAddInvoiceInfo,
  pBelAddInvoiceDetail,
  setComeFromSpe,
};
