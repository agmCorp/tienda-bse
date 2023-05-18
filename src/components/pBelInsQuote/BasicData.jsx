import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { Message } from "primereact/message";
import { useForm, Controller } from "react-hook-form";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { OverlayPanel } from "primereact/overlaypanel";
import { RadioButton } from "primereact/radiobutton";
import ReCAPTCHA from "react-google-recaptcha";
import useDataCollection from "../../hooks/useDataCollection";
import {
  RECAPTCHA_SITE_KEY,
  WHATSAPP,
  CONTACT_FORM,
  MUST_QUOTE_PREFIX,
  QUOTATION_PREFIX,
} from "../../utils/constants";
import Spinner from "../../utils/Spinner";
import {
  API_P_BEL_SITE_VERIFY,
  API_P_BEL_OBJECT_TYPES,
  API_P_BEL_MOBILITY_TYPES,
  API_P_BEL_COVERAGE_TYPES,
} from "../../utils/apiUrls";
import {
  pBelAddQuoteInfo,
  pBelFlowStepCompletedThunk,
} from "../../reduxToolkit/pBel/pBelFlowSlice";
import styles from "./BasicData.module.css";
import { clientApi } from "../../utils/clientApi";
import lapTabIpadBlue from "../../images/lap-tab-ipad-blue.png";
import lapTabIpadOrange from "../../images/lap-tab-ipad-orange.png";
import lapTabIpadRed from "../../images/lap-tab-ipad-red.png";
import photoFilmCopBlue from "../../images/photo-film-cop-blue.png";
import photoFilmCopOrange from "../../images/photo-film-cop-orange.png";
import photoFilmCopRed from "../../images/photo-film-cop-red.png";

function BasicData() {
  const ObjectTypeImages = [
    {
      id: 1,
      item: "1",
      imgBase: lapTabIpadBlue,
      imgSelected: lapTabIpadOrange,
      imgError: lapTabIpadRed,
    },
    {
      id: 2,
      item: "2",
      imgBase: photoFilmCopBlue,
      imgSelected: photoFilmCopOrange,
      imgError: photoFilmCopRed,
    },
  ];

  const getOjbectTypeImage = (objectTypeItem) => {
    return ObjectTypeImages.find((element) => element.item === objectTypeItem);
  };

  // Constants
  const P_BEL_COST_VALIDATION = {
    min: 300,
    max: 4500,
  };
  const WIDTH_THRESHOLD = 400;
  const P_BEL_OBJECT_TYPE_ID = "pBelObjectType";
  const P_BEL_COST_ID = "pBelCost";
  const P_BEL_MOBILITY_TYPE_ID = "pBelMobilityType";
  const INPUT_CAPTCHA_ID = "pBelInputCaptcha";

  const [objectTypeSelectedId, setObjectTypeSelectedId] = useState("");
  const overlayPanel = useRef(null);
  const recaptchaRef = useRef(null);
  const dispatch = useDispatch();
  const [loadingObjectType, objectTypes] = useDataCollection(
    API_P_BEL_OBJECT_TYPES
  );
  const [loadingMobilityType, mobilityTypes] = useDataCollection(
    API_P_BEL_MOBILITY_TYPES
  );
  const [loadingCoverageTypes, coverageTypes] = useDataCollection(
    API_P_BEL_COVERAGE_TYPES
  );

  const defaultValues = JSON.parse(
    `{"${P_BEL_OBJECT_TYPE_ID}":"", "${P_BEL_COST_ID}":${P_BEL_COST_VALIDATION.min}, "${P_BEL_MOBILITY_TYPE_ID}":"", "${INPUT_CAPTCHA_ID}":""}`
  );

  const {
    register,
    control,
    setValue,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <Message severity="error" text={errors[name].message} />
    );
  };

  // Verify against recaptcha with private key
  const siteVerify = async (recaptchaToken) => {
    const response = await clientApi(
      "post",
      API_P_BEL_SITE_VERIFY,
      false,
      {},
      {
        response: recaptchaToken,
      }
    );
    if (response.ok) {
      setValue(INPUT_CAPTCHA_ID, recaptchaToken, {
        shouldValidate: true,
      });
    } else {
      setError(INPUT_CAPTCHA_ID, {
        type: "manual",
        message:
          "La verificación ha fallado, por favor vuelva a cargar la página.",
      });
      setValue(INPUT_CAPTCHA_ID, "", {
        shouldValidate: false,
      });
    }
  };

  const handleOnChangeCaptcha = (token) => {
    siteVerify(token);
  };

  const handleOnExpiredCaptcha = () => {
    setValue(INPUT_CAPTCHA_ID, "", {
      shouldValidate: true,
    });
  };

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const onSubmit = (data) => {
    coverageTypes.forEach((coverageType) => {
      const quoteInfo = {
        [MUST_QUOTE_PREFIX + coverageType.item]: true,
        [QUOTATION_PREFIX + coverageType.item]: {},
      };
      dispatch(pBelAddQuoteInfo(quoteInfo));
    });
    dispatch(pBelFlowStepCompletedThunk(data));
    reset();
  };

  return (
    <>
      <div className="text-900 font-bold text-3xl text-center text-primary mb-4 mt-5">
        DESCUBRE UN SEGURO PENSADO PARA TI
      </div>
      <div className="flex flex-column text-700 text-xl text-center line-height-3 mb-4">
        <span>Contratar tu seguro es muy fácil.</span>
        <span>
          Ingresa los datos básicos, selecciona tu plan de cobertura, forma de
          pago y paga en línea!
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
                                    value={objectType}
                                    checked={
                                      field.value.item === objectType.item
                                    }
                                    className="hidden"
                                  />
                                  <div
                                    className="flex flex-column align-items-left md:align-items-center cursor-pointer"
                                    onClick={(e) => {
                                      setObjectTypeSelectedId(objectType.item);
                                      setValue(
                                        P_BEL_OBJECT_TYPE_ID,
                                        objectType,
                                        {
                                          shouldValidate: true,
                                        }
                                      );
                                    }}
                                  >
                                    <img
                                      src={
                                        errors[P_BEL_OBJECT_TYPE_ID]
                                          ? getOjbectTypeImage(objectType.item)
                                              .imgError
                                          : objectTypeSelectedId ===
                                            objectType.item
                                          ? getOjbectTypeImage(objectType.item)
                                              .imgSelected
                                          : getOjbectTypeImage(objectType.item)
                                              .imgBase
                                      }
                                      alt="Tipo de objeto"
                                      className="max-w-max h-4rem"
                                    />
                                    <span
                                      className={`${
                                        objectTypeSelectedId ===
                                          objectType.item && "text-primary"
                                      } ml-1 mr-3 text-base ${classNames({
                                        "p-error": errors[P_BEL_OBJECT_TYPE_ID],
                                      })}`}
                                    >
                                      {objectType.label}
                                    </span>
                                  </div>
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
                  <label
                    htmlFor={P_BEL_COST_ID}
                    className="cursor-pointer text-primary hover:text-color-secondary"
                    onClick={(e) => overlayPanel.current.toggle(e)}
                  >
                    <i
                      className="pi pi-bell mr-2"
                      aria-haspopup
                      aria-controls="overlayPanel"
                    ></i>
                    <span
                      className="text-xs"
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
                      required: "Debe ingresar el valor del objeto en dólares.",
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
                                    value={mobilityType}
                                    checked={
                                      field.value.item === mobilityType.item
                                    }
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

                <div className="mb-4">
                  <input
                    type="hidden"
                    {...register(INPUT_CAPTCHA_ID, {
                      required: "Debe seleccionar la casilla de verificación.",
                    })}
                  />
                  <div
                    className={`text-center m-auto max-w-min ${
                      getWindowDimensions().width <= WIDTH_THRESHOLD
                        ? styles["recaptcha-compact"]
                        : styles["recaptcha-normal"]
                    } ${classNames({
                      "border-solid border-1 p-error": errors[INPUT_CAPTCHA_ID],
                    })}`}
                  >
                    <ReCAPTCHA
                      id="recaptcha"
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={handleOnChangeCaptcha}
                      onExpired={handleOnExpiredCaptcha}
                      size={
                        getWindowDimensions().width <= WIDTH_THRESHOLD
                          ? "compact"
                          : "normal"
                      }
                      ref={recaptchaRef}
                      hl="es"
                    />
                  </div>
                  {getFormErrorMessage(INPUT_CAPTCHA_ID)}
                </div>

                {loadingObjectType ||
                loadingMobilityType ||
                loadingCoverageTypes ? (
                  <Spinner size="small" />
                ) : (
                  <Button
                    type="submit"
                    label="Cotizar"
                    className="my-2 tienda-button"
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
