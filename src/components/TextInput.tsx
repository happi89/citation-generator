import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { inputNames, Inputs } from "./CitationForm";

interface Props {
  register: UseFormRegister<Inputs>;
  errors: FieldErrorsImpl<Inputs>;
  placeholder: string;
  inputName: inputNames;
  example: string;
  errorMessage: string;
}

export function TextInput({
  register,
  errors,
  placeholder,
  inputName,
  example,
  errorMessage,
}: Props) {
  return (
    <div className="w-full max-w-2xl">
      <label>
        <span className="label-text mt-[-1rem] text-gray-400">
          Ex: {example}
        </span>
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className={`input input-bordered ${
          errors.fullName && "select-error"
        } w-full max-w-2xl focus:outline-none`}
        {...register(inputName, {
          required: true,
        })}
      />
      {errors.fullName && (
        <span className="mt-[-2.5rem] ml-auto text-error">{errorMessage}</span>
      )}
    </div>
  );
}
