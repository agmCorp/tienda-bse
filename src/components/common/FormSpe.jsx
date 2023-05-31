import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  API_BASE_URL,
  PUBLIC_SUBDIRECTORY,
  SISTARBANC_URL,
} from "../../utils/constants";

function FormSpe({
  post,
  timeOut,
  selectedData,
  apiUrlRedirect,
  handlePaymentSent,
}) {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    let timer;
    if (post) {
      timer = setTimeout(() => {
        handlePaymentSent();
        buttonRef.current.click();
        console.log("*** SPE", formRef.current.outerHTML);
      }, timeOut);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [post, dispatch, timeOut, handlePaymentSent]);

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
      {post && (
        <form
          id="spe"
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
          <input
            id="idTransaccion"
            name="idTransaccion"
            value={`22305291326005230009049372855`} // ALVARO ver pc_pagoelectronico linea 391
            readOnly
          />
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
      )}
    </>
  );
}

export default FormSpe;
