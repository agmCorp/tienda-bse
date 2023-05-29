import Protected from "../../auth/Protected";
import PBelPaymentFlowLayout from "../../components/common/pBelCommon/PBelPaymentFlowLayout";
import PolicyDetail from "../../components/pBelInsQuote/PolicyDetail";

function PBelPaymentFlowPolicyDetail() {
  return (
    <Protected>
      <PBelPaymentFlowLayout>
        <PolicyDetail />
      </PBelPaymentFlowLayout>
    </Protected>
  );
}

export default PBelPaymentFlowPolicyDetail;
