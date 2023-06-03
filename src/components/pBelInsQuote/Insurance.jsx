import { useDispatch, useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import { Button } from "primereact/button";

import {
  selectPBelPaymentFlowSelectedData,
  selectPBelPaymentSent,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import { getEmail } from "../../utils/userProfileHelper";
import { Message } from "primereact/message";
import error from "../../images/error.png";
import info from "../../images/thumbs-up.png";
import { pBelFlowGoToFirstStep } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";

function Insurance() {
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const selectedData = useSelector(selectPBelPaymentFlowSelectedData);
  const paymentSent = useSelector(selectPBelPaymentSent);

  const splitIdTrn = (idTrn) => {
    return idTrn
      ? [idTrn.substr(0, idTrn.length / 2), idTrn.substr(idTrn.length / 2)]
      : ["", ""];
  };

  const handleOnClick = () => {
    dispatch(pBelFlowGoToFirstStep());
  };

  const infoMessage = (
    <div className="text-xl text-center md:text-left">
      <span className="font-bold text-2xl">
        Transacción confirmada con éxito
      </span>
      <p>
        <span>
          Recibirás la documentación correspondiente en tu correo electrónico
        </span>
        <span> {getEmail(keycloak.tokenParsed)}</span>
      </p>
    </div>
  );

  const errorMessage = (
    <div className="text-xl text-center md:text-left">
      <span className="font-bold text-2xl">
        Transacción pendiente de confirmación
      </span>
      <p>
        La operación se encuentra pendiente de confirmación por parte de su
        Entidad Financiera. Verifique su estado de cuenta y en caso que se haya
        descontado el costo del seguro, en las próximas horas le estaremos
        enviando un correo electrónico con su póliza y condiciones generales. De
        lo contrario contáctese con la Entidad Bancaria correspondiente.
      </p>
    </div>
  );

  return (
    <div className="form-data mt-5">
      <div className="flex justify-content-center">
        <div className="card p-fluid">
          <div className="text-center mb-4">
            <div className="grid grid-nogutter border-top-1 border-bottom-1 border-primary py-2">
              <div className="col-12 md:col-4 p-3">
                <div className="text-primary text-xl mb-2">
                  N° póliza emitida
                </div>
                <div className="text-700 text-xl">{selectedData.nroPoliza}</div>
              </div>

              <div className="col-12 md:col-4 p-3">
                <div className="text-primary text-xl mb-2">Transacción</div>
                <div className="text-700 text-xl">
                  {splitIdTrn(paymentSent.data)[0]}
                </div>
                <div className="text-700 text-xl">
                  {splitIdTrn(paymentSent.data)[1]}
                </div>
              </div>

              <div className="col-12 md:col-4 p-3">
                <div className="text-primary text-xl mb-2">email</div>
                <div className="text-700 text-xl">
                  {getEmail(keycloak.tokenParsed)}
                </div>
              </div>
            </div>
          </div>

          <Message
            severity="error"
            content={
              <div className="flex flex-column md:flex-row w-full p-4">
                <img
                  alt="atención"
                  src={error}
                  className="m-auto md:ml-4 h-2rem"
                />
                <div className="mt-2 md:ml-4 md:mt-0">{errorMessage}</div>
              </div>
            }
          />

          <Message
            severity="info"
            content={
              <div className="flex flex-column md:flex-row w-full p-4">
                <img
                  alt="atención"
                  src={info}
                  className="m-auto md:ml-4 h-2rem"
                />
                <div className="mt-2 md:ml-4 md:mt-0">{infoMessage}</div>
              </div>
            }
          />

          <Button
            label="Volver a cotizar"
            icon="pi pi-check"
            onClick={handleOnClick}
            className="my-4 tienda-button"
            outlined
          />
        </div>
      </div>
    </div>
  );
}

export default Insurance;
