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
  timeOut,
  selectedData,
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
      buttonRef.current.click();
      console.log("*** SPE", formRef.current.outerHTML);
    }
  }, [idTrn]);

  useEffect(() => {
    const getIdTrn = async () => {
      let response = null;
      const responseIdTrn = await clientApi(
        "post",
        apiUrlIdTrn,
        true,
        {},
        {
          medioDePago: selectedData.bank.codigo,
          nroFactura: selectedData.numeroFactura,
        },
        {},
        keycloak.token
      );

      if (responseIdTrn.ok) {
        response = { ok: true, data: responseIdTrn.data };
      } else {
        console.error("*** GETIDTRN ERROR", responseIdTrn.data);
        response = { ok: false, data: responseIdTrn.message };
      }
      return response;
    };

    let timer;
    if (post) {
      timer = setTimeout(async () => {
        const response = await getIdTrn();
        if (response.ok) {
          handlePaymentSent({ ok: true, data: "" });
          setIdTrn(response.data.idTrn);
        } else {
          handlePaymentSent({
            ok: false,
            data: "No se ha podido completar el pago de su póliza.",
          });
        }
        handlePost(false);
      }, timeOut);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [
    post,
    apiUrlIdTrn,
    handlePost,
    timeOut,
    handlePaymentSent,
    selectedData.bank.codigo,
    selectedData.numeroFactura,
    keycloak.token,
  ]);

  const formatNumber = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .toString()
      .replace(/\./g, "")
      .replace(/,/g, "");
  };

  const removeBlanks = (str) => {
    return str.replace(/\s/g, "");
  };

  const removeHyphens = (str) => {
    return str.replace(/-/g, "");
  };

  function leftZeros(str, length) {
    return str.padStart(length, "0");
  }

  return (
    <>
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
            selectedData.bank
              ? selectedData.bank.codigo
              : selectedData.creditCard.codigo,
            3
          )}
          readOnly
        />
        <input id="idTransaccion" name="idTransaccion" value={idTrn} readOnly />
        <input id="idOrganismo" name="idOrganismo" value="BSE" readOnly />
        <input id="tipoServicio" name="tipoServicio" value="SEG" readOnly />
        <input
          id="idCuenta"
          name="idCuenta"
          value={removeBlanks(selectedData.codigoAdhesion)}
          readOnly
        />
        <input
          id="idFactura"
          name="idFactura"
          value={selectedData.numeroFactura}
          readOnly
        />
        <input
          id="importe"
          name="importe"
          value={formatNumber(selectedData.importePagar)}
          readOnly
        />
        <input
          id="importeGravado"
          name="importeGravado"
          value={formatNumber(selectedData.importeGravado)}
          readOnly
        />
        <input
          id="consumidorFinal"
          name="consumidorFinal"
          value={selectedData.consumoFinal === "S" ? "1" : "0"}
          readOnly
        />
        <input
          id="moneda"
          name="moneda"
          value={selectedData.moneda === "USD" ? "USD" : "UYU"}
          readOnly
        />
        <input
          id="fechaVenc"
          name="fechaVenc"
          value={removeHyphens(selectedData.fechaVto1)}
          readOnly
        />
        <input
          id="fechaLimitePago"
          name="fechaLimitePago"
          value={removeHyphens(selectedData.fechaVto2)}
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
    </>
  );
}

export default FormSistarbanc;
