import { createSlice } from "@reduxjs/toolkit";

import { getAllPBelPaymentFlowStepsConfig } from "../../utils/pBelUtils/pBelPaymentFlowStepsConfig";
import { stepToRoute } from "../../utils/stepsHelper";

const initialState = {
  step: 0,
  navigateTo: "",
  issueInfo: {},
  invoiceInfo: {},
  invoiceDetail: {},
  invoiceAdhDigital: {},
  selectedData: {},
  paymentSent: {},
};

const pBelPaymentFlowSlice = createSlice({
  name: "pBelPaymentFlow",
  initialState,
  reducers: {
    pBelPaymentFlowStepCompleted: (state, action) => {
      const steps = getAllPBelPaymentFlowStepsConfig();
      if (state.step < steps.length) {
        state.step += 1;
        state.navigateTo = stepToRoute(steps, state.step);
        state.selectedData = { ...state.selectedData, ...action.payload };
      } else {
        state.navigateTo = "";
      }
    },
    pBelPaymentFlowGoToStep: (state, action) => {
      const steps = getAllPBelPaymentFlowStepsConfig();
      if (0 < action.payload && action.payload <= steps.length) {
        state.step = action.payload;
        state.navigateTo = stepToRoute(steps, state.step);
      } else {
        state.navigateTo = "";
      }
    },
    pBelPaymentFlowInit: (state) => {
      state.step = 0;
      state.navigateTo = "";
      state.issueInfo = {};
      state.invoiceInfo = {};
      state.invoiceDetail = {};
      state.invoiceAdhDigital = {};
      state.selectedData = {};
      state.paymentSent = {};
    },
    pBelPaymentFlowNavigateTo: (state, action) => {
      state.navigateTo = action.payload.navigateTo;
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
    pBelAddInvoiceAdhDigital: (state, action) => {
      state.invoiceAdhDigital = action.payload;
    },
    pBelPaymentSent: (state, action) => {
      state.paymentSent = action.payload;
    },
  },
});

const {
  pBelPaymentFlowStepCompleted,
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowInit,
  pBelPaymentFlowNavigateTo,
  pBelAddIssueInfo,
  pBelAddInvoiceInfo,
  pBelAddInvoiceDetail,
  pBelAddInvoiceAdhDigital,
  pBelPaymentSent,
} = pBelPaymentFlowSlice.actions;

// Selectors
const selectPBelPaymentFlowStep = (state) => state.pBelPaymentFlow.step;
const selectPBelPaymentFlowNavigateTo = (state) =>
  state.pBelPaymentFlow.navigateTo;
const selectPBelPaymentFlowIssueInfo = (state) =>
  state.pBelPaymentFlow.issueInfo;
const selectPBelPaymentFlowInvoiceInfo = (state) =>
  state.pBelPaymentFlow.invoiceInfo;
const selectPBelPaymentFlowInvoiceDetail = (state) =>
  state.pBelPaymentFlow.invoiceDetail;
const selectPBelPaymentFlowInvoiceAdhDigital = (state) =>
  state.pBelPaymentFlow.invoiceAdhDigital;
const selectPBelPaymentFlowSelectedData = (state) =>
  state.pBelPaymentFlow.selectedData;
const selectPBelPaymentSent = (state) => state.pBelPaymentFlow.paymentSent;

export default pBelPaymentFlowSlice.reducer;
export {
  selectPBelPaymentFlowStep,
  selectPBelPaymentFlowNavigateTo,
  selectPBelPaymentFlowIssueInfo,
  selectPBelPaymentFlowInvoiceInfo,
  selectPBelPaymentFlowInvoiceDetail,
  selectPBelPaymentFlowInvoiceAdhDigital,
  selectPBelPaymentFlowSelectedData,
  selectPBelPaymentSent,
  pBelPaymentFlowSlice,
  pBelPaymentFlowStepCompleted,
  pBelPaymentFlowGoToStep,
  pBelPaymentFlowInit,
  pBelPaymentFlowNavigateTo,
  pBelAddIssueInfo,
  pBelAddInvoiceInfo,
  pBelAddInvoiceDetail,
  pBelAddInvoiceAdhDigital,
  pBelPaymentSent,
};
