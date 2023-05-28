import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PBelFlowLayout from "../../components/common/pBelCommon/PBelFlowLayout";
import BasicData from "../../components/pBelInsQuote/BasicData";
import { pBelFlowInit } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { pBelPaymentFlowInit } from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";

function PBelFlowBasicData() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pBelFlowInit());
    dispatch(pBelPaymentFlowInit());
  }, [dispatch]);

  return (
    <PBelFlowLayout>
      <BasicData />
    </PBelFlowLayout>
  );
}

export default PBelFlowBasicData;
