import { Message } from "primereact/message";

import { WHATSAPP, CONTACT_FORM } from "../../../utils/constants";
import error from "../../../images/error.png";

function DebtMessage() {
  const errorMessage = (
    <div className="text-xl">
      <span>
        No es posible continuar con la contratación de este seguro ya que, según
        nuestros registros, Ud. tiene facturas vencidas e impagas. Por más
        información contáctese con su Asesor de confianza, llamando al 1998, por
        WhatsApp
      </span>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="font-medium no-underline mx-1 text-blue-500 hover:text-blue-300 cursor-pointer"
      >
        098611998
      </a>
      <span>o a través de nuestro</span>
      <a
        href={CONTACT_FORM}
        target="_blank"
        rel="noreferrer"
        className="font-medium no-underline mx-1 text-blue-500 hover:text-blue-300 cursor-pointer"
      >
        formulario de contacto.
      </a>
    </div>
  );

  return (
    <div className="form-data">
      <div className="flex justify-content-center">
        <div className="p-fluid card">
          <Message
            severity="error"
            className="mt-1 mb-2"
            content={
              <div className="flex flex-column md:flex-row p-4">
                <img
                  alt="atención"
                  src={error}
                  className="m-auto md:ml-4 h-2rem"
                />
                <div className="mt-2 md:ml-4 md:mt-0">{errorMessage}</div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DebtMessage;
