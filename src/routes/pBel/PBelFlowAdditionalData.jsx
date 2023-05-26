import { useSelector } from "react-redux";

import Protected from "../../auth/Protected";
import PBelFlowLayout from "../../components/common/pBel/PBelFlowLayout";
import AdditionalData from "../../components/pBelInsQuote/AdditionalData";
import { selectPBelDebtControl } from "../../reduxToolkit/pBel/pBelFlowSlice";
import DebtMessage from "../../components/common/pBel/DebtMessage";

function PBelFlowAdditionalData() {
  const pBelDebtControl = useSelector(selectPBelDebtControl);

  return (
    <Protected>
      <PBelFlowLayout>
        {pBelDebtControl ? <DebtMessage /> : <AdditionalData />}
      </PBelFlowLayout>
    </Protected>
  );
}

export default PBelFlowAdditionalData;
