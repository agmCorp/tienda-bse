import { useSelector, useDispatch } from "react-redux";
import PolicyDetailForm from "../common/PolicyDetailForm";
import {
  pBelPaymentFlowStepCompleted,
  pBelPaymentSent,
  selectPBelPaymentFlowSelectedData,
  selectPBelPaymentSent,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import {
  API_PBEL_REDIRECT,
  API_PBLE_PAYMENT_NETWORKS,
} from "../../utils/apiUrls";

function PolicyDetail() {
  const dispatch = useDispatch();
  const selectedData = useSelector(selectPBelPaymentFlowSelectedData);
  const paymentSent = useSelector(selectPBelPaymentSent);

  const pBelHandlePaymentSent = () => {
    dispatch(pBelPaymentSent(true));
  };

  return (
    <PolicyDetailForm
      selectedData={selectedData}
      paymentSent={paymentSent}
      handlePaymentSent={pBelHandlePaymentSent}
      apiUrlRedirect={API_PBEL_REDIRECT}
      apiUrlPaymentNetworks={API_PBLE_PAYMENT_NETWORKS}
      paymentFlowStepCompleted={pBelPaymentFlowStepCompleted}
    />
  );
}

export default PolicyDetail;
