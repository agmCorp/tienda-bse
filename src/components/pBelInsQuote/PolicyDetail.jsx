import { useSelector } from "react-redux";
import PolicyDetailForm from "../common/PolicyDetailForm";
import {
  pBelPaymentFlowStepCompleted,
  selectComeFromPaymentGateway,
  selectPBelPaymentFlowSelectedData,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import { API_PBEL_REDIRECT } from "../../utils/apiUrls";

function PolicyDetail() {
  const selectedData = useSelector(selectPBelPaymentFlowSelectedData);
  const comeFromPaymentGateway = useSelector(selectComeFromPaymentGateway);

  return (
    <PolicyDetailForm
      selectedData={selectedData}
      comeFromPaymentGateway={comeFromPaymentGateway}
      apiUrl={API_PBEL_REDIRECT}
      paymentFlowStepCompleted={pBelPaymentFlowStepCompleted}
    />
  );
}

export default PolicyDetail;
