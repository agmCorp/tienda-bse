import { useKeycloak } from "@react-keycloak/web";

import { getName } from "../../utils/userProfileHelper";
import { NETWORKS } from "../../utils/constants";

function PurchaseSummary({ selectedData, paymentData }) {
  const { keycloak } = useKeycloak();

  return (
    <div className="grid grid-nogutter border-top-1 border-bottom-1 border-primary py-2">
      <div className="col-12 md:col-4 p-3">
        <div className="text-primary text-xl mb-2">Cobertura</div>
        <div className="text-700 text-xl">
          {selectedData.insurance.planCoberturaDsc}
        </div>
      </div>

      <div className="col-12 md:col-4 p-3">
        <div className="text-primary text-xl mb-2">N° de cotización</div>
        <div className="text-700 text-xl">
          {selectedData.insurance.nroCotizacion}
        </div>
      </div>

      <div className="col-12 md:col-4 p-3">
        <div className="text-primary text-xl mb-2">Nombre del contratante</div>
        <div className="text-700 text-xl">{getName(keycloak.tokenParsed)}</div>
      </div>

      <div className="col-12 md:col-4 p-3">
        <div className="text-primary text-xl mb-2">N° de factura</div>
        <div className="text-700 text-xl">{paymentData.numeroFactura}</div>
      </div>

      <div className="col-12 md:col-4 p-3">
        <div className="text-primary text-xl mb-2">Importe</div>
        <div className="text-700 text-xl">
          {`${
            selectedData.insurance.simboloMoneda
          } ${selectedData.paymentPlan.total.toLocaleString("es-ES", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}`}
        </div>
      </div>

      <div className="col-12 md:col-4 p-3">
        <div className="text-primary text-xl mb-2">Medio de pago</div>
        <div className="text-700 text-xl">
          <span>{paymentData.bank?.nombre}</span>
          <span>{paymentData.creditCard?.nombre}</span>
          {paymentData.paymentMethod === NETWORKS && (
            <span>Abitab / Redpagos</span>
          )}
        </div>
      </div>

      <div className="col-12 p-3">
        <div className="text-primary text-xl mb-3">Imágenes recibidas</div>

        {selectedData.images.map((file, index) => {
          return (
            <div
              key={index}
              className={`flex flex-column md:flex-row md:align-items-center md:justify-content-between ${
                index === 0 ? "border-top-1" : ""
              } border-bottom-1 surface-border p-1`}
            >
              <div className="flex align-items-center">
                <span className="block pi pi-file mr-2"></span>
                <span className="text-700">{file}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PurchaseSummary;
