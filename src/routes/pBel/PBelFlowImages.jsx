import { useSelector } from "react-redux";

import Protected from "../../auth/Protected";
import PBelFlowLayout from "../../components/common/pBel/PBelFlowLayout";
import Images from "../../components/pBelInsQuote/Images";
import { selectPBelDebtControl } from "../../reduxToolkit/pBel/pBelFlowSlice";
import DebtMessage from "../../components/common/pBel/DebtMessage";

function PBelFlowImages() {
  const pBelDebtControl = useSelector(selectPBelDebtControl);

  return (
    <Protected>
      <PBelFlowLayout>
        {pBelDebtControl ? <DebtMessage /> : <Images />}
      </PBelFlowLayout>
    </Protected>
  );
}

export default PBelFlowImages;
