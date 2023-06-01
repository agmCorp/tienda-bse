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
  apiUrlIdTrnBanred,
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

  const onSubmitForm = () => {
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
            selectedData={selectedData}
            apiUrlIdTrn={apiUrlIdTrnSistarbanc}
            apiUrlRedirect={apiUrlRedirect}
            handlePaymentSent={handlePaymentSent}
          />

          <FormBanred
            post={postToBanred}
            handlePost={setPostToBanred}
            selectedData={selectedData}
            apiUrlIdTrn={apiUrlIdTrnBanred}
            apiUrlRedirect={apiUrlRedirect}
            handlePaymentSent={handlePaymentSent}
          />

          <Networks
            networks={networks}
            handleNetworks={setNetworks}
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
            <p>ERROR: {paymentSent.data}</p>
          )}
          <Button
            type="button"
            label="Soy un boton provisorio que dice Pagar"
            onClick={onSubmitForm}
            className="my-2 tienda-button"
            icon="pi pi-check"
          />
        </>
      )}
    </>
  );
}

export default PolicyDetailForm;
