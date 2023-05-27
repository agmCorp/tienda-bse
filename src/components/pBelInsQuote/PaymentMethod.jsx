import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Message } from "primereact/message";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import {
  API_PBEL_BANKS,
  API_PBEL_BANKS_CREDIT_CARDS,
  API_PBEL_PAYMENT_METHODS,
} from "../../utils/apiUrls";

import Spinner from "../../utils/Spinner";
import useDataCollection from "../../hooks/useDataCollection";

function PaymentMethod() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [loadingBank, banks] = useDataCollection(API_PBEL_BANKS, true);
  const [loadingBankCreditCard, banksCreditCards] = useDataCollection(
    API_PBEL_BANKS_CREDIT_CARDS,
    true
  );
  const [loadingPaymentMethod, paymentMethods] = useDataCollection(
    API_PBEL_PAYMENT_METHODS,
    true
  );

  const DEBIT_RADIO = "debit";
  const CREDIT_CARD_RADIO = "creditCard";
  const PAYMENT_METHOD_ID = "paymentMethod";
  const BANK_ID = "bank";
  const CREDIT_CARD_ID = "creditCard";
  const CREDIT_CARD_CODE = 1000;

  const defaultValues = JSON.parse(
    `{"${PAYMENT_METHOD_ID}":"", "${BANK_ID}":"", "${CREDIT_CARD_ID}":""}`
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    // data.invoiceDate = dateToString(data.invoiceDate);
    // dispatch(pBelFlowStepCompletedThunk(data));
    console.log(data);
    setSelectedPaymentMethod("");
    reset();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <Message severity="error" text={errors[name].message} />
    );
  };

  const handleOnChange = (value, field) => {
    setSelectedPaymentMethod(value);
    field.onChange(value);
  };

  const getBanks = (banks, banksCreditCards, paymentMethods) => {
    const banksCodes = banks.map((bank) => bank.codigoBCU);
    const missingBanks = banksCreditCards.filter(
      (bankCreditCard) =>
        bankCreditCard.codigoBCU < CREDIT_CARD_CODE &&
        !banksCodes.includes(bankCreditCard.codigoBCU)
    );
    return [...banks, ...missingBanks, ...paymentMethods];
  };

  const getCreditCards = (banksCreditCards) => {
    return banksCreditCards.filter((card) => card.codigoBCU > CREDIT_CARD_CODE);
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
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid mt-2">
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
                        </div>
                        {getFormErrorMessage(field.name)}
                      </>
                    )}
                  />
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    {selectedPaymentMethod === DEBIT_RADIO && (
                      <>
                        {loadingBank &&
                        loadingPaymentMethod &&
                        loadingBankCreditCard ? (
                          <Spinner size="small" />
                        ) : (
                          <>
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
                                    options={getBanks(
                                      banks,
                                      banksCreditCards,
                                      paymentMethods
                                    )}
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
                                    <span className="p-error font-bold ml-1">
                                      *
                                    </span>
                                  </label>
                                </>
                              )}
                            />
                            {getFormErrorMessage(BANK_ID)}
                          </>
                        )}
                      </>
                    )}
                    {selectedPaymentMethod === CREDIT_CARD_RADIO && (
                      <>
                        {loadingBankCreditCard ? (
                          <Spinner size="small" />
                        ) : (
                          <>
                            <Controller
                              name={CREDIT_CARD_ID}
                              control={control}
                              rules={{ required: "Debe seleccionar un banco." }}
                              render={({ field, fieldState }) => (
                                <>
                                  <Dropdown
                                    id={field.name}
                                    value={field.value}
                                    optionLabel="nombre"
                                    placeholder="Seleccione una tarjeta de crédito"
                                    options={getCreditCards(banksCreditCards)}
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
                                    <span className="p-error font-bold ml-1">
                                      *
                                    </span>
                                  </label>
                                </>
                              )}
                            />
                            {getFormErrorMessage(CREDIT_CARD_ID)}
                          </>
                        )}
                      </>
                    )}
                  </span>
                </div>

                {loadingBank ||
                loadingPaymentMethod ||
                loadingBankCreditCard ? (
                  <Spinner size="small" />
                ) : (
                  <Button
                    type="submit"
                    label="Continuar"
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

export default PaymentMethod;
