// AGM 05/23
import Protected from "../../utils/Protected";
import PBelPaymentFlowLayout from "../../components/common/pBel/PBelPaymentFlowLayout";

function PBelPaymentFlowMethod() {
  return (
    <Protected>
      <PBelPaymentFlowLayout>
        {/* <PaymentMethod /> */}
        METODO DE PAGO
      </PBelPaymentFlowLayout>
    </Protected>
  );
}

export default PBelPaymentFlowMethod;
