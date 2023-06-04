import PBelProtected from "../../components/common/pBelCommon/PBelProtected";
import PBelPaymentFlowLayout from "../../components/common/pBelCommon/PBelPaymentFlowLayout";
import PolicyDetail from "../../components/pBelInsQuote/PolicyDetail";

function PBelPaymentFlowPolicyDetail() {
  return (
    <PBelProtected>
      <PBelPaymentFlowLayout>
        <PolicyDetail />
      </PBelPaymentFlowLayout>
    </PBelProtected>
  );
}

export default PBelPaymentFlowPolicyDetail;
