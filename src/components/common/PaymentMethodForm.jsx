import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { BlockUI } from "primereact/blockui";

import Spinner from "./Spinner";
import { CREDIT_CARD, DEBIT, NETWORKS } from "../../utils/constants";
import { getBankImage } from "./bankImages";
import { getCreditCardImage } from "./creditCardImages";

// banks - empty to hide
// creditCards - empty to hide
function PaymentMethodForm({ onSubmit, banks, creditCards, showNetworks }) {
  const DEBIT_RADIO = DEBIT;
  const CREDIT_CARD_RADIO = CREDIT_CARD;
  const NETWORKS_RADIO = NETWORKS;

  const PAYMENT_METHOD_ID = "paymentMethod";
  const BANK_ID = "bank";
  const CREDIT_CARD_ID = "creditCard";

  const [blockedDocument, setBlockedDocument] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedCreditCard, setSelectedCreditCard] = useState(null);

  const defaultValues = JSON.parse(
    `{"${PAYMENT_METHOD_ID}":"", "${BANK_ID}":"", "${CREDIT_CARD_ID}":""}`
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    resetField,
    reset,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <Message severity="error" text={errors[name].message} />
    );
  };

  const selectedBankTemplate = (option, props) => {
    let template = <span>{props.placeholder}</span>;
    if (option) {
      template = (
        <div className="flex flex-column align-items-center">
          <img
            alt={option.nombre}
            src={getBankImage(option.codigo)}
            style={{ width: "120px" }}
          />
          <div className="text-base text-lg">{option.nombre}</div>
        </div>
      );
    }

    return template;
  };

  const selectedCreditCardTemplate = (option, props) => {
    let template = <span>{props.placeholder}</span>;
    if (option) {
      template = (
        <div className="flex flex-column align-items-center">
          <img
            alt={option.nombre}
            src={getCreditCardImage(option.codigo)}
            style={{ width: "120px" }}
          />
          <div className="text-base text-lg">{option.nombre}</div>
        </div>
      );
    }

    return template;
  };

  const bankOptionTemplate = (option) => {
    return (
      <div className="flex flex flex-column align-items-center">
        <img
          alt={option.nombre}
          src={getBankImage(option.codigo)}
          style={{ width: "120px" }}
        />
        <div className="text-base text-lg">{option.nombre}</div>
      </div>
    );
  };

  const creditCardOptionTemplate = (option) => {
    return (
      <div className="flex flex flex-column align-items-center">
        <img
          alt={option.nombre}
          src={getCreditCardImage(option.codigo)}
          style={{ width: "120px" }}
        />
        <div className="text-base text-lg">{option.nombre}</div>
      </div>
    );
  };

  const panelBankFooterTemplate = () => {
    return (
      <div className="py-2 px-3">
        {selectedBank ? (
          <span>
            <span className="font-bold mr-1">{selectedBank.nombre}</span>
            seleccionado.
          </span>
        ) : (
          "Ningún banco seleccionado."
        )}
      </div>
    );
  };

  const panelCreditCardFooterTemplate = () => {
    return (
      <div className="py-2 px-3">
        {selectedCreditCard ? (
          <span>
            <span className="font-bold mr-1">{selectedCreditCard.nombre}</span>
            seleccionado.
          </span>
        ) : (
          "Ninguna tarjeta seleccionada."
        )}
      </div>
    );
  };

  const handleOnChangeBank = (value, field) => {
    setSelectedBank(value);
    field.onChange(value);
  };

  const handleOnChangeCreditCard = (value, field) => {
    setSelectedCreditCard(value);
    field.onChange(value);
  };

  const handleOnChangeRadio = (value, field) => {
    setSelectedPaymentMethod(value);
    field.onChange(value);
    resetField(BANK_ID);
    setSelectedBank("");
    resetField(CREDIT_CARD_ID);
    setSelectedCreditCard("");
  };

  const onSubmitForm = async (data) => {
    setShowMessage("");
    setBlockedDocument(true);
    const errorMessage = await onSubmit(data);
    if (errorMessage) {
      setShowMessage(errorMessage);
    } else {
      setSelectedPaymentMethod("");
      setSelectedBank("");
      setSelectedCreditCard("");
      reset();
    }
    setBlockedDocument(false);
  };

  return (
    <>
      <div className="font-bold text-3xl text-center mb-4 mt-5 title">
        MÉTODOS DE PAGO
      </div>
      <div className="flex flex-column text-700 text-xl text-center line-height-3 mb-4">
        <span>Selecciona el método de pago a utilizar</span>

        <div className="form-data text-left mt-4">
          <div className="flex justify-content-center">
            <div className="card">
              <form
                onSubmit={handleSubmit(onSubmitForm)}
                className="p-fluid mt-2"
              >
                {showMessage && <Message severity="error" text={showMessage} />}

                <div className="mb-4">
                  <Controller
                    name={PAYMENT_METHOD_ID}
                    control={control}
                    rules={{
                      required: "Debe seleccionar un medio de pago.",
                    }}
                    render={({ field }) => (
                      <>
                        <div>
                          <span className="text-600 text-xs">
                            Medio de pago
                          </span>
                          <span className="p-error font-bold ml-1">*</span>
                        </div>

                        <div className="flex flex-column md:flex-row md:align-items-center">
                          {banks && (
                            <div className="flex flex-row align-items-center">
                              <RadioButton
                                inputId={DEBIT_RADIO}
                                {...field}
                                inputRef={field.ref}
                                value={DEBIT_RADIO}
                                onChange={(e) => {
                                  handleOnChangeRadio(e.value, field);
                                }}
                                checked={field.value === DEBIT_RADIO}
                                className={`mr-1 ${classNames({
                                  "p-invalid": errors[PAYMENT_METHOD_ID],
                                })}`}
                              />
                              <label
                                htmlFor={DEBIT_RADIO}
                                className={`ml-1 mr-3 text-base ${classNames({
                                  "p-error": errors[PAYMENT_METHOD_ID],
                                })}`}
                              >
                                Débito bancario
                              </label>
                            </div>
                          )}

                          {creditCards && (
                            <div className="flex flex-row align-items-center">
                              <RadioButton
                                inputId={CREDIT_CARD_RADIO}
                                {...field}
                                inputRef={field.ref}
                                value={CREDIT_CARD_RADIO}
                                onChange={(e) => {
                                  handleOnChangeRadio(e.value, field);
                                }}
                                checked={field.value === CREDIT_CARD_RADIO}
                                className={`mr-1 ${classNames({
                                  "p-invalid": errors[PAYMENT_METHOD_ID],
                                })}`}
                              />
                              <label
                                htmlFor={CREDIT_CARD_RADIO}
                                className={`ml-1 mr-3 text-base ${classNames({
                                  "p-error": errors[PAYMENT_METHOD_ID],
                                })}`}
                              >
                                Tarjeta de crédito
                              </label>
                            </div>
                          )}

                          {showNetworks && (
                            <div className="flex flex-row align-items-center">
                              <RadioButton
                                inputId={NETWORKS_RADIO}
                                {...field}
                                inputRef={field.ref}
                                value={NETWORKS_RADIO}
                                onChange={(e) => {
                                  handleOnChangeRadio(e.value, field);
                                }}
                                checked={field.value === NETWORKS_RADIO}
                                className={`mr-1 ${classNames({
                                  "p-invalid": errors[PAYMENT_METHOD_ID],
                                })}`}
                              />
                              <label
                                htmlFor={NETWORKS_RADIO}
                                className={`ml-1 mr-3 text-base ${classNames({
                                  "p-error": errors[PAYMENT_METHOD_ID],
                                })}`}
                              >
                                Abitab/Redpagos
                              </label>
                            </div>
                          )}
                        </div>
                        {getFormErrorMessage(field.name)}
                      </>
                    )}
                  />
                </div>

                {selectedPaymentMethod === DEBIT_RADIO && (
                  <div className="mb-4">
                    <span className="p-float-label">
                      <Controller
                        name={BANK_ID}
                        control={control}
                        rules={{ required: "Debe seleccionar un banco." }}
                        render={({ field, fieldState }) => (
                          <>
                            <Dropdown
                              id={field.name}
                              value={field.value}
                              optionLabel="nombre"
                              placeholder="Seleccione un banco"
                              options={banks}
                              focusInputRef={field.ref}
                              onChange={(e) => {
                                handleOnChangeBank(e.value, field);
                              }}
                              className={classNames({
                                "p-invalid": fieldState.error,
                              })}
                              valueTemplate={selectedBankTemplate}
                              itemTemplate={bankOptionTemplate}
                              panelFooterTemplate={panelBankFooterTemplate}
                            />
                            <label
                              htmlFor={BANK_ID}
                              className={classNames({
                                "p-error": errors[BANK_ID],
                              })}
                            >
                              Banco
                              <span className="p-error font-bold ml-1">*</span>
                            </label>
                          </>
                        )}
                      />
                      {getFormErrorMessage(BANK_ID)}
                    </span>
                  </div>
                )}
                {selectedPaymentMethod === CREDIT_CARD_RADIO && (
                  <div className="mb-4">
                    <span className="p-float-label">
                      <Controller
                        name={CREDIT_CARD_ID}
                        control={control}
                        rules={{
                          required: "Debe seleccionar una tarjeta de crédito.",
                        }}
                        render={({ field, fieldState }) => (
                          <>
                            <Dropdown
                              id={field.name}
                              value={field.value}
                              optionLabel="nombre"
                              placeholder="Seleccione una tarjeta de crédito"
                              options={creditCards}
                              focusInputRef={field.ref}
                              onChange={(e) => {
                                handleOnChangeCreditCard(e.value, field);
                              }}
                              className={classNames({
                                "p-invalid": fieldState.error,
                              })}
                              valueTemplate={selectedCreditCardTemplate}
                              itemTemplate={creditCardOptionTemplate}
                              panelFooterTemplate={
                                panelCreditCardFooterTemplate
                              }
                            />
                            <label
                              htmlFor={CREDIT_CARD_ID}
                              className={classNames({
                                "p-error": errors[CREDIT_CARD_ID],
                              })}
                            >
                              Tarjeta de crédito
                              <span className="p-error font-bold ml-1">*</span>
                            </label>
                          </>
                        )}
                      />
                      {getFormErrorMessage(CREDIT_CARD_ID)}
                    </span>
                  </div>
                )}

                <BlockUI
                  blocked={blockedDocument}
                  fullScreen
                  template={<Spinner size="big" />}
                />

                <Button
                  type="submit"
                  label="Continuar"
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

export default PaymentMethodForm;
