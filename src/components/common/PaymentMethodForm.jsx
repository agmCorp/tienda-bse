import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { BlockUI } from "primereact/blockui";

import Spinner from "../../utils/Spinner";

// banks - empty to hide
// creditCards - empty to hide
function PaymentMethodForm({ onSubmit, banks, creditCards, showNetworks }) {
  const DEBIT_RADIO = "debit";
  const CREDIT_CARD_RADIO = "creditCard";
  const NETWORKS_RADIO = "networks";

  const PAYMENT_METHOD_ID = "paymentMethod";
  const BANK_ID = "bank";
  const CREDIT_CARD_ID = "creditCard";

  const [blockedDocument, setBlockedDocument] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const defaultValues = JSON.parse(
    `{"${PAYMENT_METHOD_ID}":"", "${BANK_ID}":"", "${CREDIT_CARD_ID}":""}`
  );

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

  const handleOnChange = (value, field) => {
    setSelectedPaymentMethod(value);
    field.onChange(value);
  };

  const onSubmitForm = async (data) => {
    setBlockedDocument(true);
    await onSubmit(data);
    setSelectedPaymentMethod("");
    reset();
    setBlockedDocument(false);
  };

  return (
    <>
      <div className="text-900 font-bold text-3xl text-center text-primary mb-4 mt-5">
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
                                  handleOnChange(e.value, field);
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
                                  handleOnChange(e.value, field);
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
                                  handleOnChange(e.value, field);
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
                              onChange={(e) => field.onChange(e.value)}
                              className={classNames({
                                "p-invalid": fieldState.error,
                              })}
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
                              onChange={(e) => field.onChange(e.value)}
                              className={classNames({
                                "p-invalid": fieldState.error,
                              })}
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
