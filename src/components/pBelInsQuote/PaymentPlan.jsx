import { Message } from "primereact/message";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import Spinner from "../../utils/Spinner";
import warning from "../../images/warning.png";
import "./PaymentPlan.css";

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
      style={{
        width: "100%",
        borderRadius: "10px",
        border: "1px solid #E4A630",
        backgroundColor: "#F7E4C0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "20%",
            textAlign: "center",
            margin: "0.35em",
          }}
        >
          <img src={warning} alt="" style={{ height: "30px" }} />
        </div>
        <div style={{ width: "80%", margin: "0.35em" }}>
          Pagas la primera cuota ahora, las restantes facturas le llegarán a su
          dirección de correo electrónico y podrán ser abonadas ingresando a
          MiBSE o en las redes de cobranza.
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
              <div key={planDeCuotas.id} className="optionscont col">
                <div className="option">
                  <div className="row">
                    <div className="radio">
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

                    <div className="row">
                      <div className="col">
                        <p className="cuotas">3 cuotas</p>
                        <p className="ptf">P.T.F $ 38.000</p>
                      </div>
                      <div className="col total">
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

      {/* <div className="optionscont col">
        <div className="option">
          <div className="row">
            <div className="radio">
              <input type="radio" name="cuotassel" />
            </div>

            <div className="row">
              <div className="col">
                <p className="cuotas">3 cuotas</p>
                <p className="ptf">P.T.F $ 38.000</p>
              </div>
              <div className="col total">
                <p>$33.000</p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #E4A630",
            backgroundColor: "#F7E4C0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "center",
                margin: "0.35em",
              }}
            >
              <img src={warning} alt="" style={{ height: "30px" }} />
            </div>
            <div style={{ width: "80%", margin: "0.35em" }}>
              Pagas la primera cuota ahora, las restantes facturas le llegarán a
              su dirección de correo electrónico y podrán ser abonadas
              ingresando a MiBSE o en las redes de cobranza.
            </div>
          </div>
        </div>
      </div> */}
      {/* division */}
      {/* <div className="container m-auto">
        <div className="cardx">
          <div className="colx">
            <p>Elige con que opción pagar tu plan/seguro</p>
            <p className="subtitle">¿En cuántas cuotas quieres pagar?</p>
            <div className="optionscont colx">
              <div className="option">
                <div className="row">
                  <div className="radio">
                    <input type="radio" name="cuotassel" />
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="cuotas">3 cuotas</p>
                      <p className="ptf">P.T.F $ 38.000</p>
                    </div>
                    <div className="col total">
                      <p>$33.000</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="row">
                  <div className="radio">
                    <input type="radio" name="cuotassel" />
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="cuotas">6 cuotas</p>
                      <p className="ptf">P.T.F $ 38.000</p>
                    </div>
                    <div className="col total">
                      <p>$33.000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid #E4A630",
                  backgroundColor: "#F7E4C0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "20%",
                      textAlign: "center",
                      margin: "0.35em",
                    }}
                  >
                    <img src="warning.png" alt="" style={{ height: "30px" }} />
                  </div>
                  <div style={{ width: "80%", margin: "0.35em" }}>
                    Pagas la primera cuota ahora, las restantes facturas le
                    llegarán a su dirección de correo electrónico y podrán ser
                    abonadas ingresando a MiBSE o en las redes de cobranza.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </form>
  );
}

export default PaymentPlan;
