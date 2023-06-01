import { useSelector, useDispatch } from "react-redux";
import PolicyDetailForm from "../common/PolicyDetailForm";
import {
  pBelPaymentFlowStepCompleted,
  pBelPaymentSent,
  selectPBelPaymentFlowSelectedData,
  selectPBelPaymentSent,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import {
  API_PBEL_IDTRN_SISTARBANC,
  API_PBEL_REDIRECT,
  API_PBLE_PAYMENT_NETWORKS,
} from "../../utils/apiUrls";

function PolicyDetail() {
  const dispatch = useDispatch();
  const selectedData = useSelector(selectPBelPaymentFlowSelectedData);
  const paymentSent = useSelector(selectPBelPaymentSent);

  const pBelHandlePaymentSent = (paymentSent) => {
    if (paymentSent) {
      dispatch(pBelPaymentSent(paymentSent));
    } else {
      // No need to add more data to the store.
      dispatch(pBelPaymentFlowStepCompleted());
    }
  };

  return (
    <>
      <PolicyDetailForm
        selectedData={selectedData}
        paymentSent={paymentSent}
        handlePaymentSent={pBelHandlePaymentSent}
        apiUrlIdTrnSistarbanc={API_PBEL_IDTRN_SISTARBANC}
        apiUrlRedirect={API_PBEL_REDIRECT}
        apiUrlPaymentNetworks={API_PBLE_PAYMENT_NETWORKS}
      />
    </>
  );
}

export default PolicyDetail;
