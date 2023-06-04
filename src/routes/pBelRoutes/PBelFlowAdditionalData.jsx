import PBelProtected from "../../components/common/pBelCommon/PBelProtected";
import PBelFlowLayout from "../../components/common/pBelCommon/PBelFlowLayout";
import DebtControl from "../../components/pBelInsQuote/DebtControl";

function PBelFlowAdditionalData() {
  return (
    <PBelProtected>
      <PBelFlowLayout>
        <DebtControl />
      </PBelFlowLayout>
    </PBelProtected>
  );
}

export default PBelFlowAdditionalData;
