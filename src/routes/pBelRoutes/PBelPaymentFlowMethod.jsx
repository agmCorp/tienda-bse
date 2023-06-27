import PBelProtectedByRoles from "../../components/common/pBelCommon/PBelProtectedByRoles";
import PBelPaymentFlowLayout from "../../components/common/pBelCommon/PBelPaymentFlowLayout";
import PaymentMethod from "../../components/pBelInsQuote/PaymentMethod";

function PBelPaymentFlowMethod() {
  return (
    <PBelProtectedByRoles>
      <PBelPaymentFlowLayout>
        <PaymentMethod />
      </PBelPaymentFlowLayout>
    </PBelProtectedByRoles>
  );
}

export default PBelPaymentFlowMethod;
