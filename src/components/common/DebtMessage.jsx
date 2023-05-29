import { Message } from "primereact/message";
import { Button } from "primereact/button";

import { WHATSAPP, CONTACT_FORM } from "../../utils/constants";
import error from "../../images/error.png";

function DebtMessage({ init }) {
  const errorMessage = (
    <div className="text-xl text-center md:text-left">
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
        className="font-medium no-underline text-blue-500 hover:text-blue-300 cursor-pointer"
      >
        <span> 098611998 </span>
      </a>
      <span>o a través de nuestro</span>
      <a
        href={CONTACT_FORM}
        target="_blank"
        rel="noreferrer"
        className="font-medium no-underline text-blue-500 hover:text-blue-300 cursor-pointer"
      >
        <span> formulario de contacto.</span>
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
          <Button
            onClick={init}
            label="Volver a cotizar"
            icon="pi pi-check"
            className="my-2 tienda-button"
          />
        </div>
      </div>
    </div>
  );
}

export default DebtMessage;
