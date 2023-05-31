import { BlockUI } from "primereact/blockui";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Spinner from "./Spinner";
import FormSpe from "./FormSpe";
import FormBanred from "./FormBanred";
import Networks from "./Networks";
import { Button } from "primereact/button";

function PolicyDetailForm({
  selectedData,
  paymentSent,
  handlePaymentSent,
  apiUrlRedirect,
  apiUrlPaymentNetworks,
  paymentFlowStepCompleted,
}) {
  const TIME_OUT = 5000; // Just to display a text message (Procesando...) for a while.

  const dispatch = useDispatch();

  const [postToSpe, setPostToSpe] = useState(false);
  const [postToBanred, setPostToBanred] = useState(false);
  const [networks, setNetworks] = useState(false);

  useEffect(() => {
    let timer;
    if (paymentSent) {
      timer = setTimeout(() => {
        dispatch(paymentFlowStepCompleted()); // No need to add more data to the store.
      }, TIME_OUT);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, paymentFlowStepCompleted, paymentSent]);

  const onSubmit = () => {
    if (selectedData.paymentMethod === "networks") {
      setNetworks(true);
    } else {
      if (selectedData.paymentMethod === "debit") {
        if (selectedData.bank.codigo === "BANRED") {
          setPostToBanred(true);
        } else {
          setPostToSpe(true);
        }
      } else {
        setPostToSpe(true);
      }
    }
  };

  return (
    <>
      {paymentSent || postToSpe || postToBanred || networks ? (
        <>
          <span>Soy una pantalla linda que dice PROCESANDO</span>
          <FormSpe
            post={postToSpe && !paymentSent}
            timeOut={TIME_OUT}
            selectedData={selectedData}
            apiUrlRedirect={apiUrlRedirect}
            handlePaymentSent={handlePaymentSent}
          />
          <FormBanred
            post={postToBanred && !paymentSent}
            timeOut={TIME_OUT}
            selectedData={selectedData}
            apiUrlRedirect={apiUrlRedirect}
            handlePaymentSent={handlePaymentSent}
          />
          <Networks
            networks={networks && !paymentSent}
            selectedData={selectedData}
            apiUrlPaymentNetworks={apiUrlPaymentNetworks}
            handlePaymentSent={handlePaymentSent}
          />
          <BlockUI
            blocked={true}
            fullScreen
            template={<Spinner size="big" />}
          />
        </>
      ) : (
        <>
          <span>
            Acá muestro resumen de póliza comprada y términos particulares
          </span>
          <Button
            type="button"
            label="Soy un boton provisorio que dice Pagar"
            onClick={onSubmit}
            className="p-button-info mt-2"
          />
        </>
      )}
    </>
  );
}

export default PolicyDetailForm;
