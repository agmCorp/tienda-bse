import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import PolicyDetailForm from "../common/PolicyDetailForm";
import {
  pBelPaymentFlowStepCompleted,
  pBelPaymentSent,
  selectPBelPaymentFlowSelectedData,
  selectPBelPaymentSent,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import {
  API_PBEL_IDTRN_BANRED,
  API_PBEL_IDTRN_SISTARBANC,
  API_PBEL_REDIRECT,
  API_PBLE_PAYMENT_NETWORKS,
} from "../../utils/apiUrls";

function PolicyDetail() {
  const dispatch = useDispatch();
  const selectedData = useSelector(selectPBelPaymentFlowSelectedData);
  const paymentSent = useSelector(selectPBelPaymentSent);

  const terms = [
    { id: 1, name: "term1", text: "texto del termino 1" },
    { id: 2, name: "term2", text: "texto del termino 2" },
    { id: 3, name: "term3", text: "texto del termino 3" },
  ];

  // useCallback returns a memoized callback function.
  // Every time this component re-renders, its functions get recreated. Because of this, the pBelHandlePaymentSent function has actually changed
  // and could triggers useEffects in PolicyDetailForm.
  // To fix this, we use the useCallback hook to prevent the function from being recreated unless necessary.
  const pBelHandlePaymentSent = useCallback(
    (paymentSent) => {
      if (paymentSent) {
        dispatch(pBelPaymentSent(paymentSent));
      } else {
        // No need to add more data to the store.
        dispatch(pBelPaymentFlowStepCompleted());
      }
    },
    [dispatch]
  );

  return (
    <>
      <PolicyDetailForm
        paymentData={selectedData}
        paymentSent={paymentSent}
        handlePaymentSent={pBelHandlePaymentSent}
        apiUrlIdTrnSistarbanc={API_PBEL_IDTRN_SISTARBANC}
        apiUrlIdTrnBanred={API_PBEL_IDTRN_BANRED}
        apiUrlRedirect={API_PBEL_REDIRECT}
        apiUrlPaymentNetworks={API_PBLE_PAYMENT_NETWORKS}
        terms={terms}
      />
    </>
  );
}

export default PolicyDetail;
