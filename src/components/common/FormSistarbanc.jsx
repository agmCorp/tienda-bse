import { useEffect, useRef, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";

import {
  API_BASE_URL,
  PUBLIC_SUBDIRECTORY,
  SISTARBANC_URL,
} from "../../utils/constants";
import { clientApi } from "../../utils/clientApi";

function FormSistarbanc({
  post,
  handlePost,
  paymentData,
  apiUrlIdTrn,
  apiUrlRedirect,
  handlePaymentSent,
}) {
  const { keycloak } = useKeycloak();
  const buttonRef = useRef(null);
  const formRef = useRef(null);
  const [idTrn, setIdTrn] = useState("");

  useEffect(() => {
    if (idTrn) {
      handlePost(false);
      buttonRef.current.click();
      console.log("*** SPE", formRef.current.outerHTML);
    }
  }, [idTrn, handlePost]);

  useEffect(() => {
    const getIdTrn = async () => {
      let response = null;
      const responseIdTrn = await clientApi(
        "post",
        apiUrlIdTrn,
        true,
        {},
        {
          medioDePago: paymentData.bank
            ? paymentData.bank.codigo
            : paymentData.creditCard.codigo,
          nroFactura: paymentData.numeroFactura,
        },
        {},
        keycloak.token
      );

      if (responseIdTrn.ok) {
        response = { ok: true, data: responseIdTrn.data };
      } else {
        response = { ok: false, data: responseIdTrn.message };
      }
      return response;
    };

    const getIdTrnCaller = async () => {
      if (post) {
        const response = await getIdTrn();
        if (response.ok) {
          handlePaymentSent({ ok: true, data: "" });
          setIdTrn(response.data.idTrn);
        } else {
          handlePaymentSent({
            ok: false,
            data: "No se ha podido completar el pago de su póliza.",
          });
          handlePost(false);
        }
      }
    };

    getIdTrnCaller();
  }, [
    post,
    apiUrlIdTrn,
    handlePost,
    paymentData.bank,
    paymentData.creditCard.codigo,
    paymentData.numeroFactura,
    keycloak.token,
    handlePaymentSent,
  ]);

  const formatNumber = (num) => {
    return parseFloat(String(num))
      .toFixed(2)
      .toString()
      .replace(/\./g, "")
      .replace(/,/g, "");
  };

  const removeBlanks = (str) => {
    return String(str).replace(/\s/g, "");
  };

  const removeHyphens = (str) => {
    return String(str).replace(/-/g, "");
  };

  function leftZeros(str, length) {
    return String(str).padStart(length, "0");
  }

  return (
    <>
      {post && (
        <form
          id="sistarbanc"
          action={SISTARBANC_URL}
          method="post"
          style={{ display: "none" }}
          ref={formRef}
        >
          <input
            id="idBanco"
            name="idBanco"
            value={leftZeros(
              paymentData.bank
                ? paymentData.bank.codigo
                : paymentData.creditCard.codigo,
              3
            )}
            readOnly
          />
          <input
            id="idTransaccion"
            name="idTransaccion"
            value={idTrn}
            readOnly
          />
          <input id="idOrganismo" name="idOrganismo" value="BSE" readOnly />
          <input id="tipoServicio" name="tipoServicio" value="SEG" readOnly />
          <input
            id="idCuenta"
            name="idCuenta"
            value={removeBlanks(paymentData.codigoAdhesion)}
            readOnly
          />
          <input
            id="idFactura"
            name="idFactura"
            value={paymentData.numeroFactura}
            readOnly
          />
          <input
            id="importe"
            name="importe"
            value={formatNumber(paymentData.importePagar)}
            readOnly
          />
          <input
            id="importeGravado"
            name="importeGravado"
            value={formatNumber(paymentData.importeGravado)}
            readOnly
          />
          <input
            id="consumidorFinal"
            name="consumidorFinal"
            value={paymentData.consumoFinal === "S" ? "1" : "0"}
            readOnly
          />
          <input
            id="moneda"
            name="moneda"
            value={paymentData.moneda === "USD" ? "USD" : "UYU"}
            readOnly
          />
          <input
            id="fechaVenc"
            name="fechaVenc"
            value={removeHyphens(paymentData.fechaVto1)}
            readOnly
          />
          <input
            id="fechaLimitePago"
            name="fechaLimitePago"
            value={removeHyphens(paymentData.fechaVto2)}
            readOnly
          />
          <input
            id="otroDato"
            name="otroDato"
            value="PASARELA DE PAGOS MIBSE"
            readOnly
          />
          <input
            id="urlVuelta"
            name="urlVuelta"
            value={`${API_BASE_URL}/${PUBLIC_SUBDIRECTORY}/${apiUrlRedirect}?referrer=${window.location.href}`}
            readOnly
          />

          <button type="submit" ref={buttonRef}>
            Submit
          </button>
        </form>
      )}
    </>
  );
}

export default FormSistarbanc;
