import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import PolicyDetailForm from "../common/PolicyDetailForm";
import {
  pBelPaymentFlowStepCompleted,
  pBelPaymentSent,
  selectPBelPaymentFlowSelectedData,
  selectPBelPaymentSent,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import {
  API_PBEL_IDTRN_BANRED,
  API_PBEL_IDTRN_SISTARBANC,
  API_PBEL_REDIRECT,
  API_PBEL_PAYMENT_NETWORKS,
} from "../../utils/apiUrls";
import { selectPBelFlowSelectedData } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";

function PolicyDetail() {
  const dispatch = useDispatch();
  const selectedData = useSelector(selectPBelFlowSelectedData);
  const paymentFlowSelectedData = useSelector(
    selectPBelPaymentFlowSelectedData
  );
  const paymentSent = useSelector(selectPBelPaymentSent);

  const terms = [
    {
      id: 1,
      name: "term1",
      element: (
        <span>
          Acepto los Términos y condiciones de la póliza que se presentan
          <a
            href="https://www.bse.com.uy/documentos/condiciones-generales-objetos-varios.pdf"
            target="_blank"
            rel="noreferrer"
            className="font-medium no-underline mx-1 text-blue-500 hover:text-blue-300 cursor-pointer"
          >
            aquí <span className="pi pi-file-pdf" />
          </a>
        </span>
      ),
    },
    {
      id: 2,
      name: "term2",
      element: (
        <span>
          Para que el seguro entre en vigencia y el usuario pueda hacer uso de
          la cobertura, se deberá efectuar un pago en línea al momento de la
          contratación. Si el plan de pago es contado se deberá abonar la
          totalidad del costo del seguro; si el plan es financiado se deberá
          abonar la primer cuota.
        </span>
      ),
    },
  ];

  // useCallback returns a memoized callback function.
  // Every time this component re-renders, its functions get recreated. Because of this, the pBelHandlePaymentSent function has actually changed
  // and could triggers useEffects in PolicyDetailForm.
  // To fix this, we use the useCallback hook to prevent the function from being recreated unless necessary.
  const pBelHandlePaymentSent = useCallback(
    (paymentSent) => {
      if (paymentSent) {
        dispatch(pBelPaymentSent(paymentSent));
      } else {
        // No need to add more data to the store.
        dispatch(pBelPaymentFlowStepCompleted());
      }
    },
    [dispatch]
  );

  return (
    <>
      <PolicyDetailForm
        selectedData={selectedData}
        paymentData={paymentFlowSelectedData}
        paymentSent={paymentSent}
        handlePaymentSent={pBelHandlePaymentSent}
        apiUrlIdTrnSistarbanc={API_PBEL_IDTRN_SISTARBANC}
        apiUrlIdTrnBanred={API_PBEL_IDTRN_BANRED}
        apiUrlRedirect={API_PBEL_REDIRECT}
        apiUrlPaymentNetworks={API_PBEL_PAYMENT_NETWORKS}
        terms={terms}
      />
    </>
  );
}

export default PolicyDetail;
