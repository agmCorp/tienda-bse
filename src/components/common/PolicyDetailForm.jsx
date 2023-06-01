import { BlockUI } from "primereact/blockui";
import { useEffect, useState } from "react";

import Spinner from "./Spinner";
import FormSistarbanc from "./FormSistarbanc";
import FormBanred from "./FormBanred";
import Networks from "./Networks";
import { Button } from "primereact/button";

function PolicyDetailForm({
  selectedData,
  paymentSent,
  handlePaymentSent,
  apiUrlIdTrnSistarbanc,
  apiUrlRedirect,
  apiUrlPaymentNetworks,
}) {
  const TIME_OUT = 5000; // Just to display a text message (Procesando...) for a while.

  const [postToSistarbanc, setPostToSistarbanc] = useState(false);
  const [postToBanred, setPostToBanred] = useState(false);
  const [networks, setNetworks] = useState(false);

  useEffect(() => {
    let timer;
    if (paymentSent.ok) {
      timer = setTimeout(() => {
        handlePaymentSent();
      }, TIME_OUT);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [handlePaymentSent, paymentSent.ok]);

  const onSubmit = () => {
    if (selectedData.paymentMethod === "networks") {
      setNetworks(true);
    } else {
      if (selectedData.paymentMethod === "debit") {
        if (selectedData.bank.codigo === "BANRED") {
          setPostToBanred(true);
        } else {
          setPostToSistarbanc(true);
        }
      } else {
        setPostToSistarbanc(true);
      }
    }
  };

  return (
    <>
      {paymentSent.ok || postToSistarbanc || postToBanred || networks ? (
        <>
          <span>Soy una pantalla linda que dice PROCESANDO</span>
          <FormSistarbanc
            post={postToSistarbanc}
            handlePost={setPostToSistarbanc}
            timeOut={TIME_OUT}
            selectedData={selectedData}
            apiUrlIdTrn={apiUrlIdTrnSistarbanc}
            apiUrlRedirect={apiUrlRedirect}
            handlePaymentSent={handlePaymentSent}
          />
          <FormBanred
            post={postToBanred}
            timeOut={TIME_OUT}
            selectedData={selectedData}
            apiUrlRedirect={apiUrlRedirect}
            handlePaymentSent={handlePaymentSent}
          />
          <Networks
            networks={networks}
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
          {!paymentSent.ok && paymentSent.data && (
            <>ERROR: {paymentSent.data}</>
          )}
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
