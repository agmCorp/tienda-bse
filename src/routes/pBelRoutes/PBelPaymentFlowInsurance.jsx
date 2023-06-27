import PBelProtectedByRoles from "../../components/common/pBelCommon/PBelProtectedByRoles";
import PBelPaymentFlowLayout from "../../components/common/pBelCommon/PBelPaymentFlowLayout";
import Insurance from "../../components/pBelInsQuote/Insurance";

function PBelPaymentFlowInsurance() {
  return (
    <PBelProtectedByRoles>
      <PBelPaymentFlowLayout>
        <Insurance />
      </PBelPaymentFlowLayout>
    </PBelProtectedByRoles>
  );
}

export default PBelPaymentFlowInsurance;
