import { keyCertificates, paymentPreference } from "./data";
import { FileInput, FormInput} from "./formFields";
import { SelectInput } from "./SelectInput";
import type { StepFormProps } from "./types";

const ExperienceDocsStep = ({ register, errors, watch }: StepFormProps) => {
 
  return (
    <>
      <FormInput name="relevantExperience" label="Years of Relevant Experience" register={register} errors={errors} />
      <SelectInput name="keyCertifications" watch={watch} label="Key Certifications" options={keyCertificates} register={register} errors={errors} />
      <FormInput name="pastProjects" label="Major Past Projects / Client" className="md:col-span-2" register={register} errors={errors} />
      <FileInput name="brochure" label="Product/Service Brochure or Catalog" helper="Max 10MB, PDF preferred" register={register} errors={errors} />
      <FileInput name="technicalSpecSheet" label="Technical Specifications Sheet" helper="Detailed technical specs - Max 10MB" register={register} errors={errors} />
      <FileInput name="uploadedDocuments" label="Upload Documents" helper="Trade License, VAT Certificate, ISO Certificates, Bank Details, Insurance Certificate (max 15 files, PDF/JPG)" className="md:col-span-2" register={register} errors={errors} />
      <SelectInput name="paymentTermsPreference" watch={watch} label="Payment Terms Preference" 
      options={paymentPreference} className="md:col-span-2" register={register} errors={errors} />
      <TermsCheckbox register={register} errors={errors} />
    </>
  );
};

const TermsCheckbox = ({ register, errors }: Pick<StepFormProps, "register" | "errors">) => {
  const error = errors.termsAccepted?.message;

  return (
    <label className="flex items-start gap-2 md:col-span-2">
      <input
        type="checkbox"
        {...register("termsAccepted", { required: "Required" })}
        className="mt-1 h-3.5 w-3.5 shrink-0 accent-primary"
      />
      <span className="text-13 leading-[1.5] text-secondary">
        I confirm all information is accurate and agree to Dosteen&apos;s{" "}
        <a href="#" className="text-primary underline">
          Supplier Terms & Conditions.
        </a>
        {error && <span className="ml-2 text-red-500">{error}</span>}
      </span>
    </label>
  );
};

export default ExperienceDocsStep;
