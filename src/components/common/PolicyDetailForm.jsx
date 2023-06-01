import { BlockUI } from "primereact/blockui";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

import Spinner from "./Spinner";
import FormSistarbanc from "./FormSistarbanc";
import FormBanred from "./FormBanred";
import Networks from "./Networks";

function PolicyDetailForm({
  selectedData,
  paymentSent,
  handlePaymentSent,
  apiUrlIdTrnSistarbanc,
  apiUrlIdTrnBanred,
  apiUrlRedirect,
  apiUrlPaymentNetworks,
}) {
  const TIME_OUT = 5_000; // Waiting time until the payment gateway confirms the transaction

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
          <div className="flex flex-column justify-content-center align-items-center h-10rem">
            <span className="text-900 font-bold text-3xl text-primary">
              PROCESANDO
            </span>
            <span className="text-700 text-xl text-center line-height-3">
              Por favor espera unos segundos...
            </span>
          </div>

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
            <Message severity="error" text={paymentSent.data} />
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
