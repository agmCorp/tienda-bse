import { Controller } from "react-hook-form";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import { Message } from "primereact/message";

function Terms({ terms, control, errors }) {
  const getFormErrorMessage = () => {
    return Object.keys(errors).length > 0 ? (
      <Message
        severity="error"
        text="Para continuar debe aceptar todos los términos y condiciones."
      />
    ) : (
      <></>
    );
  };

  return (
    <>
      {terms.map((term) => (
        <div key={term.id} className="mb-4 text-justify">
          <Controller
            name={term.name}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field, fieldState }) => (
              <Checkbox
                inputId={field.name}
                checked={field.value}
                onChange={(e) => field.onChange(e.checked)}
                className={`mr-2 ${classNames({
                  "p-invalid": fieldState.invalid,
                })}`}
                inputRef={field.ref}
              />
            )}
          />
          <label
            htmlFor={term.name}
            className={classNames({
              "p-error": errors[term.name],
            })}
          >
            {term.element}
          </label>
        </div>
      ))}
      {getFormErrorMessage()}
    </>
  );
}

export default Terms;
