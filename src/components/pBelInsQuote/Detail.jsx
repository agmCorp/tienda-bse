import { useSelector } from "react-redux";
import {
  selectPBelFlowSelectedData,
  selectPBelFlowStep,
} from "../../reduxToolkit/pBel/pBelFlowSlice";

function Detail() {
  const selectedData = useSelector(selectPBelFlowSelectedData);
  const pBelFlowStep = useSelector(selectPBelFlowStep);

  return (
    <>
      {pBelFlowStep > 1 && (
        <div className="grid grid-nogutter border-top-1 border-bottom-1 surface-border pt-2 text-center">
          {pBelFlowStep >= 2 && (
            <>
              <div className="col-12 md:col-4">
                <div className="text-500 font-medium mb-2">Tipo de objeto</div>
                <div className="text-900 mb-2">
                  {selectedData.objectType.label}
                </div>
              </div>
              <div className="col-12 md:col-4">
                <div className="text-500 font-medium mb-2">Valor</div>
                <div className="text-900 mb-2">
                  {`U$S ${parseFloat(selectedData.cost).toLocaleString(
                    "es-ES",
                    {
                      style: "decimal",
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }
                  )}`}
                </div>
              </div>
              <div className="col-12 md:col-4">
                <div className="text-500 font-medium mb-2">
                  Tipo de movilidad
                </div>
                <div className="text-900 mb-2">
                  {selectedData.mobilityType.label}
                </div>
              </div>
            </>
          )}

          {pBelFlowStep >= 3 && (
            <div className="col-12 md:col-4">
              <div className="text-500 font-medium mb-2">Plan de cobertura</div>
              <div className="text-900 mb-2">
                {selectedData.insurance.planCoberturaDsc}
              </div>
            </div>
          )}

          {pBelFlowStep >= 4 && (
            <>
              <div className="col-12 md:col-4">
                <div className="text-500 font-medium mb-2">Plan de pagos</div>
                <div className="text-900 mb-2">
                  {selectedData.paymentPlan.descripcion}
                </div>
              </div>
              <div className="col-12 md:col-4">
                <div className="text-500 font-medium mb-2">
                  Costo total (imp. inc.)
                </div>
                <div className="text-900 mb-2">
                  {`U$S ${selectedData.paymentPlan.total.toLocaleString(
                    "es-ES",
                    {
                      style: "decimal",
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }
                  )}`}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Detail;
