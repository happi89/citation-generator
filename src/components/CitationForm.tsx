import { TextInput } from "./TextInput";
import { useForm, SubmitHandler } from "react-hook-form";

export type Inputs = {
  fullName: string;
  dateOfPublication: Date;
  titleOfPost: string;
  websiteName: string;
  url: string;
};

export type inputNames =
  | "titleOfPost"
  | "fullName"
  | "dateOfPublication"
  | "websiteName"
  | "url";

export type inputProps = {
  placeholder: string;
  inputName: inputNames;
  example: string;
  errorMessage: string;
};

const CitationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(
      `${data.fullName}.${data.dateOfPublication}:${data.titleOfPost}.${data.websiteName}.${data.url}`
    );

  return (
    <form
      className="container mx-auto mt-24 mb-12 flex max-w-2xl flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {FORM_INFO.map((input, i) => {
        return (
          <TextInput
            key={i}
            register={register}
            errors={errors}
            placeholder={input?.placeholder}
            errorMessage={input?.errorMessage}
            example={input?.example}
            inputName={input?.inputName}
          />
        );
      })}

      <input className="btn btn-primary self-end" type="submit" />
    </form>
  );
};

export default CitationForm;

const FORM_INFO: inputProps[] = [
  {
    placeholder: "Author's full name",
    errorMessage: "Author's full name is required",
    example: "Kramer Linsey",
    inputName: "fullName",
  },
  {
    placeholder: "Date of Publication",
    errorMessage: "Date of Publication is required",
    example: "2021, April 9",
    inputName: "dateOfPublication",
  },
  {
    placeholder: "Post/Article Title",
    errorMessage: "Post/Article title is required",
    example: "How to boil an egg",
    inputName: "titleOfPost",
  },
  {
    placeholder: "Website name",
    errorMessage: "Website name is required",
    example: "Grammerly",
    inputName: "websiteName",
  },
  {
    placeholder: "Website URL",
    errorMessage: "Website URL is required",
    example: "https://www.grammarly.com",
    inputName: "url",
  },
];