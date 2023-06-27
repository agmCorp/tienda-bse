import PBelProtectedByRoles from "../../components/common/pBelCommon/PBelProtectedByRoles";
import PBelFlowLayout from "../../components/common/pBelCommon/PBelFlowLayout";
import DebtControl from "../../components/pBelInsQuote/DebtControl";

function PBelFlowAdditionalData() {
  return (
    <PBelProtectedByRoles>
      <PBelFlowLayout>
        <DebtControl />
      </PBelFlowLayout>
    </PBelProtectedByRoles>
  );
}

export default PBelFlowAdditionalData;
