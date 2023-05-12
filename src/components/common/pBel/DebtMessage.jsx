import { Button } from "primereact/button";
import { WHATSAPP, CONTACT_FORM } from "../../../utils/constants";

function DebtMessage({ handleClick, isBikeFlow }) {
  return (
    <div className="mx-auto my-5 shadow-4 p-4 w-11 md:w-6 border-round bg-white">
      <div className="surface-section p-3 md:p-6">
        <div className="flex align-items-start p-2 md:p-4 bg-pink-100 border-round border-1 border-pink-300">
          <i className="hidden md:block pi pi-times-circle text-pink-900 text-2xl md:text-3xl mr-3" />
          <div className="md:mr-3">
            <div className="text-center md:text-left text-pink-900 font-medium text-2xl line-height-1 mb-3">
              <i className="md:hidden text-2xl pi pi-times-circle text-pink-900 mr-2" />
              Atención
            </div>
            <div className="m-0 p-0 text-pink-700 text-center md:text-justify md:text-xl">
              No es posible continuar con la contratación de este seguro ya que,
              según nuestros registros, Ud. tiene facturas vencidas e impagas.
              Por más información contáctese con su Asesor de confianza,
              llamando al 1998, por WhatsApp
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="font-medium no-underline mx-1 text-blue-500 hover:text-blue-300 cursor-pointer"
              >
                098611998
              </a>
              o a través de nuestro
              <a
                href={CONTACT_FORM}
                target="_blank"
                rel="noreferrer"
                className="font-medium no-underline mx-1 text-blue-500 hover:text-blue-300 cursor-pointer"
              >
                formulario de contacto.
              </a>
            </div>
          </div>
          <div className="hidden md:block ml-auto">
            <span
              className="inline-flex align-items-center justify-content-center ml-auto border-circle hover:bg-pink-50 no-underline cursor-pointer transition-colors transition-duration-150"
              style={{ width: "1.5rem", height: "1.5rem" }}
              onClick={handleClick}
            >
              <i className="pi pi-times text-pink-900"></i>
            </span>
          </div>
        </div>
        <Button
          label="Volver a cotizar"
          className={`p-3 w-full p-button-outlined mt-4 ${
            !isBikeFlow ? "p-button-info" : ""
          }`}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default DebtMessage;
