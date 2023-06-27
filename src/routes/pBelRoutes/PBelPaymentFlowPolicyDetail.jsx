import PBelProtectedByRoles from "../../components/common/pBelCommon/PBelProtectedByRoles";
import PBelPaymentFlowLayout from "../../components/common/pBelCommon/PBelPaymentFlowLayout";
import PolicyDetail from "../../components/pBelInsQuote/PolicyDetail";

function PBelPaymentFlowPolicyDetail() {
  return (
    <PBelProtectedByRoles>
      <PBelPaymentFlowLayout>
        <PolicyDetail />
      </PBelPaymentFlowLayout>
    </PBelProtectedByRoles>
  );
}

export default PBelPaymentFlowPolicyDetail;
