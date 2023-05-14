import { useDispatch } from "react-redux";
import { useRef } from "react";
import { Message } from "primereact/message";
import { useForm, Controller } from "react-hook-form";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { OverlayPanel } from "primereact/overlaypanel";
import { RadioButton } from "primereact/radiobutton";
import ReCAPTCHA from "react-google-recaptcha";

import useDataCollection from "../../hooks/useDataCollection";
import { WHATSAPP, CONTACT_FORM } from "../../utils/constants";
import Spinner from "../../utils/Spinner";
import {
  API_P_BEL_OBJECT_TYPES,
  API_P_BEL_MOBILITY_TYPES,
} from "../../utils/apiUrls";
import { pBelFlowStepCompletedThunk } from "../../reduxToolkit/pBel/pBelFlowSlice";

function BasicData() {
  // Constants
  const P_BEL_COST_VALIDATION = {
    min: 300,
    max: 4500,
  };
  const P_BEL_COST_ID = "pBelCost";
  const P_BEL_OBJECT_TYPE_ID = "pBelObjectType";
  const P_BEL_MOBILITY_TYPE_ID = "pBelMobilityType";
  const CAPTCHA_ID = "captcha";

  const overlayPanel = useRef(null);
  const dispatch = useDispatch();
  const [loadingObjectType, objectTypes] = useDataCollection(
    API_P_BEL_OBJECT_TYPES
  );
  const [loadingMobilityType, mobilityTypes] = useDataCollection(
    API_P_BEL_MOBILITY_TYPES
  );
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <Message severity="error" text={errors[name].message} />
    );
  };

  const defaultValues = JSON.parse(
    `{"${P_BEL_COST_ID}":${P_BEL_COST_VALIDATION.min}, "${P_BEL_MOBILITY_TYPE_ID}":"", "${CAPTCHA_ID}":""}`
  );

  const {
    register,
    control,
    setValue,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
    setFocus,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log("hola", data);
    // coverageTypes.forEach((coverageType) => {
    //   const quoteInfo = {
    //     [MUST_QUOTE_PREFIX + coverageType.item]: true,
    //     [QUOTATION_PREFIX + coverageType.item]: {},
    //   };
    //   dispatch(addQuoteInfo(quoteInfo));
    // });
    dispatch(pBelFlowStepCompletedThunk(data));
    reset();
  };

  return (
    <>
      <div className="text-900 font-bold text-3xl text-center text-primary mb-4 mt-5">
        DESCUBRÍ UN SEGURO PENSADO PARA TI
      </div>
      <div className="flex flex-column text-700 text-xl text-center line-height-3 mb-4">
        <span>Contratar tu seguro es muy fácil.</span>
        <span>
          Ingresa los datos básicos, selecciona tu plan de cobertura y paga en
          línea!
        </span>

        <div className="form-data text-left mt-4">
          <div className="flex justify-content-center">
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid mt-2">
                <div className="mb-4">
                  {loadingObjectType ? (
                    <Spinner size="small" />
                  ) : (
                    <Controller
                      name={P_BEL_OBJECT_TYPE_ID}
                      control={control}
                      rules={{
                        required: "Debe seleccionar un tipo de objeto.",
                      }}
                      render={({ field }) => (
                        <>
                          <div>
                            <span className="text-600 text-xs">
                              Tipo de Objeto
                            </span>
                            <span className="p-error font-bold ml-1">*</span>
                          </div>

                          <div className="flex justify-content-left">
                            <div className="flex flex-column md:flex-row md:align-items-center">
                              {objectTypes.map((objectType) => (
                                <div
                                  key={objectType.id}
                                  className="flex flex-row align-items-center"
                                >
                                  <RadioButton
                                    inputId={objectType.item}
                                    {...field}
                                    inputRef={field.ref}
                                    value={objectType.item}
                                    checked={field.value === objectType.item}
                                    className={`mr-1 ${classNames({
                                      "p-invalid": errors[P_BEL_OBJECT_TYPE_ID],
                                    })}`}
                                  />
                                  <label
                                    htmlFor={objectType.item}
                                    className={`ml-1 mr-3 text-base ${classNames(
                                      {
                                        "p-error": errors[P_BEL_OBJECT_TYPE_ID],
                                      }
                                    )}`}
                                  >
                                    {objectType.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          {getFormErrorMessage(field.name)}
                        </>
                      )}
                    />
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor={P_BEL_COST_ID}>
                    <i
                      className="pi pi-bell cursor-pointer text-primary hover:text-color-secondary mr-2"
                      onClick={(e) => overlayPanel.current.toggle(e)}
                      aria-haspopup
                      aria-controls="overlayPanel"
                    ></i>
                    <span
                      className="text-xs cursor-pointer text-primary hover:text-color-secondary"
                      onClick={(e) => overlayPanel.current.toggle(e)}
                      aria-haspopup
                      aria-controls="overlayPanel"
                    >
                      Valor factura en dólares
                    </span>
                    <span className="p-error font-bold ml-1">*</span>
                  </label>
                  <Controller
                    name={P_BEL_COST_ID}
                    control={control}
                    rules={{
                      required:
                        "Debe ingresar el valor del objeto personal en dólares.",
                    }}
                    render={({ field, fieldState }) => (
                      <InputNumber
                        id={field.name}
                        value={field.value}
                        onValueChange={(e) => field.onChange(e.value)}
                        showButtons
                        decrementButtonClassName="p-button-secondary"
                        incrementButtonClassName="p-button-primary"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                        min={P_BEL_COST_VALIDATION.min}
                        max={P_BEL_COST_VALIDATION.max}
                        prefix="U$S "
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        inputRef={field.ref}
                      />
                    )}
                  />
                  {getFormErrorMessage(P_BEL_COST_ID)}
                  <OverlayPanel
                    ref={overlayPanel}
                    showCloseIcon
                    id="overlayPanel"
                    className="w-16rem md:w-30rem"
                  >
                    <div className="text-sm">
                      Para valor de objeto personal superior a U$S
                      <span className="mx-1">{P_BEL_COST_VALIDATION.max}</span>
                      el seguro requiere cotización específica. Puede
                      solicitarlo a través del whatsapp
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium no-underline mx-1 text-blue-500 hover:text-blue-300 cursor-pointer"
                      >
                        098611998
                      </a>
                      o nuestro
                      <a
                        href={CONTACT_FORM}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium no-underline mx-1 text-blue-500 hover:text-blue-300 cursor-pointer"
                      >
                        formulario de contacto.
                      </a>
                    </div>
                  </OverlayPanel>
                </div>

                <div className="mb-4">
                  {loadingMobilityType ? (
                    <Spinner size="small" />
                  ) : (
                    <Controller
                      name={P_BEL_MOBILITY_TYPE_ID}
                      control={control}
                      rules={{
                        required: "Debe seleccionar el tipo de movilidad.",
                      }}
                      render={({ field }) => (
                        <>
                          <div>
                            <span className="text-600 text-xs">
                              Tipo de Movilidad
                            </span>
                            <span className="p-error font-bold ml-1">*</span>
                          </div>

                          <div className="flex justify-content-left">
                            <div className="flex flex-column md:flex-row md:align-items-center">
                              {mobilityTypes.map((mobilityType) => (
                                <div
                                  key={mobilityType.id}
                                  className="flex flex-row align-items-center"
                                >
                                  <RadioButton
                                    inputId={mobilityType.item}
                                    {...field}
                                    inputRef={field.ref}
                                    value={mobilityType.item}
                                    checked={field.value === mobilityType.item}
                                    className={`mr-1 ${classNames({
                                      "p-invalid": errors[P_BEL_OBJECT_TYPE_ID],
                                    })}`}
                                  />
                                  <label
                                    htmlFor={mobilityType.item}
                                    className={`ml-1 mr-3 text-base ${classNames(
                                      {
                                        "p-error":
                                          errors[P_BEL_MOBILITY_TYPE_ID],
                                      }
                                    )}`}
                                  >
                                    {mobilityType.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          {getFormErrorMessage(field.name)}
                        </>
                      )}
                    />
                  )}
                </div>

                {loadingObjectType || loadingMobilityType ? (
                  <Spinner size="small" />
                ) : (
                  <Button
                    type="submit"
                    label="Cotizar"
                    className="my-2"
                    icon="pi pi-check"
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicData;