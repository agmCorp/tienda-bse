import { useDispatch } from "react-redux";
import { useEffect } from "react";

import PBelFlowLayout from "../../components/common/pBelCommon/PBelFlowLayout";
import BasicData from "../../components/pBelInsQuote/BasicData";
import { pBelFlowClear } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { pBelPaymentFlowInit } from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";

function PBelFlowBasicData() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pBelFlowClear());
    dispatch(pBelPaymentFlowInit());
  }, [dispatch]);

  return (
    <PBelFlowLayout>
      <BasicData />
    </PBelFlowLayout>
  );
}

export default PBelFlowBasicData;
