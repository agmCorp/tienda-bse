import { Message } from "primereact/message";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import Spinner from "../../utils/Spinner";
import warning from "../../images/warning.png";
import { MI_BSE } from "../../utils/constants";

function PaymentPlan() {
  const {
    register,
    control,
    setValue,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <Message severity="error" text={errors[name].message} />
    );
  };

  const planDeCuotasList = [
    {
      cantCuotas: "1",
      descripcion: "CONTADO",
      id: 1,
      primerCuota: 335.62,
      total: 335.62,
    },
    {
      cantCuotas: "2",
      descripcion: "2 PAGOS",
      id: 2,
      primerCuota: 169.49,
      total: 338.97,
    },
    {
      cantCuotas: "3",
      descripcion: "3 PAGOS",
      id: 3,
      primerCuota: 113.44,
      total: 340.33,
    },
  ];
  const onSubmit = (data) => {
    reset();
  };

  const warningX = (
    <div
      className="my-2"
      style={{
        width: "100%",
        borderRadius: "10px",
        border: "1px solid #E4A630",
        backgroundColor: "#F7E4C0",
      }}
    >
      <div className="flex flex-row align-items-center justify-content-center">
        <div className="w-2 text-center m-2">
          <img src={warning} alt="Atención" className="h-2rem" />
        </div>
        <div className="w-10 m-2">
          Pagás la primera cuota ahora, las restantes facturas te llegarán a tu
          dirección de correo electrónico y podrán ser abonadas ingresando a
          <a
            href={MI_BSE}
            target="_blank"
            rel="noreferrer"
            className="font-medium no-underline mx-1 text-blue-500 hover:text-blue-300 cursor-pointer"
          >
            MiBSE
          </a>
          o en las redes de cobranza.
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid mt-2">
      <Controller
        name={"AGM_CUOTAS"}
        control={control}
        rules={{
          required: "Debe seleccionar UNA CUOTA.",
        }}
        render={({ field }) => (
          <>
            {planDeCuotasList.map((planDeCuotas) => (
              <div
                key={planDeCuotas.id}
                className="flex flex-column justify-content-center align-items-center gap-3 w-full py-2"
              >
                <div className="w-full flex flex-row align-items-center border-round-md border-solid border-1 border-400">
                  <div className="flex flex-row align-items-center justify-content-center w-full">
                    <div className="align-self-center p-3">
                      <RadioButton
                        inputId={planDeCuotas.cantCuotas}
                        {...field}
                        inputRef={field.ref}
                        value={planDeCuotas.cantCuotas}
                        checked={field.value === planDeCuotas.cantCuotas}
                        className={`${classNames({
                          "p-invalid": errors["AGM_CUOTAS"],
                        })}`}
                      />
                    </div>
                    <div className="flex flex-row align-items-center justify-content-center w-full">
                      <div className="flex flex-column w-full">
                        <p className="mr-1 mb-1 mt-0">3 cuotas</p>
                        <p className="text-xs line-height-1 m-0">
                          P.T.F $ 38.000
                        </p>
                      </div>
                      <div className="flex flex-column w-full text-right text-lg font-bold line-height-2 mr-4">
                        <p>$33.000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {warningX}
            {getFormErrorMessage(field.name)}
          </>
        )}
      />

      {false || false || false ? (
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
  );
}

export default PaymentPlan;
