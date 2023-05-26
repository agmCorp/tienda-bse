import Protected from "../../auth/Protected";
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
