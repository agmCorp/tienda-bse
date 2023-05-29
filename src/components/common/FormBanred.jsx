import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setComeFromPaymentGateway } from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";

function FormBanred({ post, timeOut, selectedData }) {
  const dispatch = useDispatch();

  const buttonRef = useRef(null);

  useEffect(() => {
    let timer;
    if (post) {
      timer = setTimeout(() => {
        alert("agendo timer para hacer post a Banred");
        dispatch(setComeFromPaymentGateway(true));
        buttonRef.current.click();
      }, timeOut);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [post, dispatch, timeOut]);

  return (
    <>
      {post && (
        <form
          id="spe"
          //   action={SISTARBANC_URL}
          action="http://localhost:8080/ApiTiendaWebServices/api/objPersonal/public/redireccion?referrer=http://localhost/aplicaciones/tiendaBSE/objPersonal/detalleDePoliza"
          method="get"
          style={{ display: "none" }}
        >
          {/* <input
            id="idBanco"
            name="idBanco"
            value={
              selectedData.bank
                ? selectedData.bank.item
                : selectedData.creditCard.item
            }
            readOnly
          />
          <input
            id="idTransaccion"
            name="idTransaccion"
            value={selectedData.trn}
            readOnly
          />
          <input id="idOrganismo" name="idOrganismo" value="BSE" readOnly />
          <input id="tipoServicio" name="tipoServicio" value="SEG" readOnly />
          <input
            id="idCuenta"
            name="idCuenta"
            value={selectedData.account}
            readOnly
          />
          <input
            id="idFactura"
            name="idFactura"
            value={selectedData.invoice}
            readOnly
          />
          <input
            id="importe"
            name="importe"
            value={selectedData.amount}
            readOnly
          />
          <input
            id="importeGravado"
            name="importeGravado"
            value={selectedData.taxedAmount}
            readOnly
          />
          <input
            id="consumidorFinal"
            name="consumidorFinal"
            value={selectedData.finalConsumer}
            readOnly
          />
          <input
            id="moneda"
            name="moneda"
            value={selectedData.currency}
            readOnly
          />
          <input
            id="fechaVenc"
            name="fechaVenc"
            value={selectedData.dueDate}
            readOnly
          />
          <input
            id="fechaLimitePago"
            name="fechaLimitePago"
            value={selectedData.paydayLimit}
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
            value={`${API_BASE_URL}/${API_SISTARBANC_BACK_URL}?referrer=${window.location.href}`}
            readOnly
          /> */}

          <button type="submit" ref={buttonRef}>
            Submit
          </button>
        </form>
      )}
    </>
  );
}

export default FormBanred;
