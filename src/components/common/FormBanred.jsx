import { useEffect, useRef, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";

import {
  API_BASE_URL,
  PUBLIC_SUBDIRECTORY,
  BANRED_URL,
} from "../../utils/constants";
import { clientApi } from "../../utils/clientApi";

function FormBanred({
  post,
  handlePost,
  paymentData,
  apiUrlIdTrn,
  apiUrlRedirect,
  handlePaymentSent,
}) {
  const urlBack = `${API_BASE_URL}/${PUBLIC_SUBDIRECTORY}/${apiUrlRedirect}?referrer=${window.location.href}`;

  const { keycloak } = useKeycloak();
  const buttonRef = useRef(null);
  const formRef = useRef(null);
  const [idTrn, setIdTrn] = useState("");
  const [idTrnFirmado, setIdTrnFirmado] = useState("");

  useEffect(() => {
    if (idTrn && idTrnFirmado) {
      handlePost(false);
      buttonRef.current.click();
      console.log("*** BANRED", formRef.current.outerHTML);
    }
  }, [idTrn, idTrnFirmado, handlePost]);

  useEffect(() => {
    const getIdTrn = async () => {
      let response = null;
      const responseIdTrn = await clientApi(
        "post",
        apiUrlIdTrn,
        true,
        {},
        {
          medioDePago: "0000",
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
          setIdTrnFirmado(response.data.idTrnFirmado);
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
    return parseFloat(String(num)).toFixed(2).replace(/,/g, ".");
  };

  const removeBlanks = (str) => {
    return String(str).replace(/\s/g, "");
  };

  const removeHyphens = (str) => {
    return String(str).replace(/-/g, "");
  };

  return (
    <>
      {post && (
        <form
          id="banred"
          action={BANRED_URL}
          method="post"
          style={{ display: "none" }}
          ref={formRef}
        >
          <input id="version" name="version" value="1.0" readOnly />

          <input id="codComercio" name="codComercio" value="BSE" readOnly />
          <input id="codProveedor" name="codProveedor" value="BSE" readOnly />
          <input
            id="nroTrxComercio"
            name="nroTrxComercio"
            value={idTrn}
            readOnly
          />
          <input
            id="nroCuenta"
            name="nroCuenta"
            value={removeBlanks(paymentData.codigoAdhesion)}
            readOnly
          />
          <input
            id="nroFactura"
            name="nroFactura"
            value={paymentData.numeroFactura}
            readOnly
          />
          <input id="firma" name="firma" value={idTrnFirmado} readOnly />
          <input
            id="fechaVencimiento"
            name="fechaVencimiento"
            value={removeHyphens(paymentData.fechaVto1)}
            readOnly
          />
          <input
            id="monto"
            name="monto"
            value={formatNumber(paymentData.importePagar)}
            readOnly
          />
          <input
            id="ConsumidorFinal"
            name="ConsumidorFinal"
            value={paymentData.consumoFinal}
            readOnly
          />
          <input
            id="MontoGravado"
            name="MontoGravado"
            value={formatNumber(paymentData.importeGravado)}
            readOnly
          />
          <input
            id="moneda"
            name="moneda"
            value={paymentData.moneda === "USD" ? "D" : "N"}
            readOnly
          />
          <input
            id="descripcion"
            name="descripcion"
            value="PASARELA DE PAGOS TIENDA BSE"
            readOnly
          />
          <input id="urlVueltaOK" name="urlVueltaOK" value={urlBack} readOnly />
          <input
            id="urlVueltaError"
            name="urlVueltaError"
            value={urlBack}
            readOnly
          />
          <input id="urlBack" name="urlBack" value={urlBack} readOnly />

          <button type="submit" ref={buttonRef}>
            Submit
          </button>
        </form>
      )}
    </>
  );
}

export default FormBanred;
