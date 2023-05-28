import Protected from "../../auth/Protected";
import PBelPaymentFlowLayout from "../../components/common/pBelCommon/PBelPaymentFlowLayout";

function PBelPaymentFlowPolicyDetail() {
  return (
    <Protected>
      <PBelPaymentFlowLayout>
        {/* <PolicyDetail /> */}
        DETALLE POLIZA
      </PBelPaymentFlowLayout>
    </Protected>
  );
}

export default PBelPaymentFlowPolicyDetail;
