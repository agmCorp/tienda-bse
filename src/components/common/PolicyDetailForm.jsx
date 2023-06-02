import { BlockUI } from "primereact/blockui";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useForm } from "react-hook-form";

import Spinner from "./Spinner";
import FormSistarbanc from "./FormSistarbanc";
import FormBanred from "./FormBanred";
import Networks from "./Networks";
import Terms from "./Terms";
import PurchaseSummary from "./PurchaseSummary";

function PolicyDetailForm({
  paymentData,
  paymentSent,
  handlePaymentSent,
  apiUrlIdTrnSistarbanc,
  apiUrlIdTrnBanred,
  apiUrlRedirect,
  apiUrlPaymentNetworks,
  terms,
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

  const emptyValues = (terms) => {
    return terms.reduce((obj, term) => {
      obj[term.name] = "";
      return obj;
    }, {});
  };

  const defaultValues = emptyValues(terms);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmitForm = () => {
    if (paymentData.paymentMethod === "networks") {
      setNetworks(true);
    } else {
      if (paymentData.paymentMethod === "debit") {
        if (paymentData.bank.codigo === "BANRED") {
          setPostToBanred(true);
        } else {
          setPostToSistarbanc(true);
        }
      } else {
        setPostToSistarbanc(true);
      }
    }
    reset();
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
            paymentData={paymentData}
            apiUrlIdTrn={apiUrlIdTrnSistarbanc}
            apiUrlRedirect={apiUrlRedirect}
            handlePaymentSent={handlePaymentSent}
          />

          <FormBanred
            post={postToBanred}
            handlePost={setPostToBanred}
            paymentData={paymentData}
            apiUrlIdTrn={apiUrlIdTrnBanred}
            apiUrlRedirect={apiUrlRedirect}
            handlePaymentSent={handlePaymentSent}
          />

          <Networks
            networks={networks}
            handleNetworks={setNetworks}
            paymentData={paymentData}
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
          <div className="text-900 font-bold text-3xl text-center text-primary mb-4 mt-5">
            RESUMEN DE COMPRA
          </div>

          <PurchaseSummary />

          <div className="form-data">
            <div className="flex justify-content-center">
              <div className="card">
                <form
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="p-fluid mt-5"
                >
                  <Terms terms={terms} control={control} errors={errors} />

                  {!paymentSent.ok && paymentSent.data && (
                    <Message severity="error" text={paymentSent.data} />
                  )}

                  <Button
                    type="submit"
                    label="Pagar"
                    icon="pi pi-check"
                    className="mt-2 tienda-button"
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PolicyDetailForm;
