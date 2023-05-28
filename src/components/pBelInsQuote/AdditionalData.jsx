import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Message } from "primereact/message";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

import { pBelFlowStepCompletedThunk } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { dateToString } from "../../utils/dateHelper";
import "./AdditionalData.css";

function AdditionalData() {
  // Constants
  const INVOICE_DATE_ID = "invoiceDate";
  const BRAND_ID = "brand";
  const SERIAL_ID = "serial";
  const MODEL_ID = "model";

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();

  let minDate = new Date();
  minDate.setMonth(month);
  minDate.setFullYear(year - 2);

  let maxDate = new Date();
  maxDate = today;

  function dateTemplate(date) {
    let result;
    if (date.selectable) {
      if (date.today) {
        result = <div className="text-white font-bold">{date.day}</div>;
      } else {
        result = <div className="text-primary font-bold">{date.day}</div>;
      }
    } else {
      result = <div className="text-400">{date.day}</div>;
    }

    return result;
  }

  const dispatch = useDispatch();
  const defaultValues = JSON.parse(
    `{"${INVOICE_DATE_ID}":"", "${BRAND_ID}":"", "${SERIAL_ID}":"", "${MODEL_ID}":""}`
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    data.invoiceDate = dateToString(data.invoiceDate);
    dispatch(pBelFlowStepCompletedThunk(data));
    reset();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <Message severity="error" text={errors[name].message} />
    );
  };

  return (
    <>
      <div className="text-900 font-bold text-3xl text-center text-primary mb-4 mt-5">
        INFORMACIÓN ADICIONAL
      </div>
      <div className="flex flex-column text-700 text-xl text-center line-height-3 mb-4">
        <span>Cuéntanos algo más sobre tu objeto personal</span>

        <div className="form-data text-left mt-4">
          <div className="flex justify-content-center">
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid mt-2">
                <div className="mb-4">
                  <span className="p-float-label">
                    <Controller
                      name={INVOICE_DATE_ID}
                      control={control}
                      rules={{
                        required: "Debe seleccionar la fecha de factura.",
                      }}
                      render={({ field, fieldState }) => (
                        <Calendar
                          inputId={field.name}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value}
                          onChange={field.onChange}
                          locale="es"
                          dateFormat="dd/mm/yy"
                          minDate={minDate}
                          maxDate={maxDate}
                          dateTemplate={dateTemplate}
                          readOnlyInput
                          showIcon
                        />
                      )}
                    />
                    <label
                      htmlFor={INVOICE_DATE_ID}
                      className={classNames({
                        "p-error": errors[INVOICE_DATE_ID],
                      })}
                    >
                      Fecha de factura
                      <span className="p-error font-bold ml-1">*</span>
                    </label>
                  </span>
                  {getFormErrorMessage(INVOICE_DATE_ID)}
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    <Controller
                      name={BRAND_ID}
                      control={control}
                      rules={{
                        required: "Debe ingresar una marca.",
                        maxLength: {
                          value: 30,
                          message: "Ingrese máximo 30 caracteres",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor={BRAND_ID}
                      className={classNames({ "p-error": errors[BRAND_ID] })}
                    >
                      Marca
                      <span className="p-error font-bold ml-1">*</span>
                    </label>
                  </span>
                  {getFormErrorMessage(BRAND_ID)}
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    <Controller
                      name={SERIAL_ID}
                      control={control}
                      rules={{
                        required: "Debe ingresar la serie.",
                        maxLength: {
                          value: 30,
                          message: "Ingrese máximo 30 caracteres",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor={SERIAL_ID}
                      className={classNames({ "p-error": errors[SERIAL_ID] })}
                    >
                      Serie
                      <span className="p-error font-bold ml-1">*</span>
                    </label>
                  </span>
                  {getFormErrorMessage(SERIAL_ID)}
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    <Controller
                      name={MODEL_ID}
                      control={control}
                      rules={{
                        required: "Debe ingresar el modelo.",
                        maxLength: {
                          value: 30,
                          message: "Ingrese máximo 30 caracteres",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor={MODEL_ID}
                      className={classNames({ "p-error": errors[MODEL_ID] })}
                    >
                      Modelo
                      <span className="p-error font-bold ml-1">*</span>
                    </label>
                  </span>
                  {getFormErrorMessage(MODEL_ID)}
                </div>

                <Button
                  type="submit"
                  label="Contratar"
                  icon="pi pi-check"
                  className="mt-2 tienda-button"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdditionalData;
