import { useState } from "react";
import { Message } from "primereact/message";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "primereact/utils";
import { RadioButton } from "primereact/radiobutton";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";

import warning from "../../images/warning.png";
import { MI_BSE } from "../../utils/constants";
import {
  pBelFlowStepCompletedThunk,
  selectPBelFlowSelectedData,
} from "../../reduxToolkit/pBel/pBelFlowSlice";

function PaymentPlan() {
  const CANT_CUOTAS_CONTADO = 1;
  const SEE_ALL_THRESHOLD = 4;
  const P_BEL_PAYMENT_PLAN_ID = "pBelPaymentPlan";
  const defaultValues = JSON.parse(`{"${P_BEL_PAYMENT_PLAN_ID}":""}`);

  const selectedData = useSelector(selectPBelFlowSelectedData);
  const dispatch = useDispatch();
  const [seeAll, setSeeAll] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <Message severity="error" text={errors[name].message} />
    );
  };

  const handleOnChangeToggle = (e) => {
    reset();
    setSeeAll(e.value);
  };

  const onSubmit = (data) => {
    dispatch(pBelFlowStepCompletedThunk(data));
    reset();
  };

  const warningMessage = (
    <>
      <span>
        Pagás la primera cuota ahora, las restantes facturas te llegarán a tu
        dirección de correo electrónico y podrán ser abonadas ingresando a
      </span>
      <a
        href={MI_BSE}
        target="_blank"
        rel="noreferrer"
        className="font-medium no-underline mx-1 text-blue-500 hover:text-blue-300 cursor-pointer"
      >
        MiBSE
      </a>
      <span>o en las redes de cobranza.</span>
    </>
  );

  return (
    <>
      <div className="text-900 font-bold text-3xl text-center text-primary mb-4 mt-5">
        PLANES DE PAGO
      </div>
      <div className="flex flex-column text-700 text-xl text-center line-height-3 mb-4">
        <span>¿En cuántas cuotas quieres pagar?</span>
        <span>Elige con que opción pagar tu plan/seguro</span>

        <div className="form-data text-left mt-4">
          <div className="flex justify-content-center">
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid mt-2">
                {selectedData.insurance.planDeCuotasList.length >
                  SEE_ALL_THRESHOLD && (
                  <Message
                    severity="warn"
                    className="mt-1 mb-2"
                    content={
                      <>
                        <img
                          alt="atención"
                          src={warning}
                          className="ml-4 h-2rem"
                        />
                        <div className="ml-4">{warningMessage}</div>
                      </>
                    }
                  />
                )}
                <Controller
                  name={P_BEL_PAYMENT_PLAN_ID}
                  control={control}
                  rules={{
                    required: "Debe seleccionar un plan de pago.",
                  }}
                  render={({ field }) => (
                    <>
                      {selectedData.insurance.planDeCuotasList.map(
                        (planDeCuotas, index) =>
                          (index + 1 <= SEE_ALL_THRESHOLD || seeAll) && (
                            <div
                              key={planDeCuotas.id}
                              className="flex flex-column justify-content-center align-items-center gap-3 py-1 w-full text-primary"
                              style={{ display: "none" }}
                            >
                              <div
                                className={`flex flex-row align-items-center border-round-lg border-solid border-1 border-400 w-full ${classNames(
                                  {
                                    "border-solid border-1 border-red-500 p-error":
                                      errors[P_BEL_PAYMENT_PLAN_ID],
                                  }
                                )}`}
                              >
                                <div className="flex flex-row align-items-center justify-content-center w-full">
                                  <div className="align-self-center p-3 mb-2">
                                    <RadioButton
                                      inputId={planDeCuotas.cantCuotas}
                                      {...field}
                                      inputRef={field.ref}
                                      value={planDeCuotas}
                                      checked={
                                        field.value.cantCuotas ===
                                        planDeCuotas.cantCuotas
                                      }
                                      className={`${classNames({
                                        "p-invalid":
                                          errors[P_BEL_PAYMENT_PLAN_ID],
                                      })}`}
                                    />
                                  </div>
                                  <div className="flex flex-row align-items-center justify-content-center w-full mb-1">
                                    <div className="flex flex-column w-full">
                                      <p className="mr-1 mb-1 mt-0 font-semibold">
                                        {planDeCuotas.cantCuotas >
                                          CANT_CUOTAS_CONTADO && (
                                          <>{planDeCuotas.cantCuotas} cuotas</>
                                        )}
                                        {planDeCuotas.cantCuotas ===
                                          CANT_CUOTAS_CONTADO && <>CONTADO</>}
                                      </p>
                                      <p className="text-xs text-600 line-height-1 m-0">
                                        {`P.T.F ${
                                          selectedData.insurance.simboloMoneda
                                        } ${parseFloat(
                                          planDeCuotas.total
                                        ).toLocaleString("es-ES", {
                                          style: "decimal",
                                          maximumFractionDigits: 2,
                                          minimumFractionDigits: 2,
                                        })}`}
                                      </p>
                                    </div>
                                    <div className="flex flex-column w-full text-right text-lg font-semibold line-height-2 mr-4 mt-1">
                                      <p>{`${
                                        selectedData.insurance.simboloMoneda
                                      } ${parseFloat(
                                        planDeCuotas.primerCuota
                                      ).toLocaleString("es-ES", {
                                        style: "decimal",
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 2,
                                      })}`}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                      {selectedData.insurance.planDeCuotasList.length >
                        SEE_ALL_THRESHOLD && (
                        <div className="text-center">
                          <ToggleButton
                            onLabel="Ver menos opciones de cuotas"
                            offLabel="Ver todas las opciones de cuotas"
                            onIcon="pi pi-angle-double-up text-primary"
                            offIcon="pi pi-angle-double-down text-primary"
                            iconPos="right"
                            checked={seeAll}
                            onChange={handleOnChangeToggle}
                            className="mb-4 p-button-text text-primary bg-white max-w-max border-primary text-xs"
                          />
                        </div>
                      )}

                      {getFormErrorMessage(field.name)}
                    </>
                  )}
                />

                <Button
                  type="submit"
                  label="Contratar"
                  className="my-2 tienda-button"
                  icon="pi pi-check"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPlan;
