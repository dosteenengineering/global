import { FormInput, PhoneInput } from "./formFields";
import type { StepFormProps } from "./types";
import { getNames } from "country-list";
import {SelectInput} from "./SelectInput"

const CompanyDetailsStep = ({ register, control, watch, errors }: StepFormProps) => {
  const countries = getNames();
  return (
    <>
      <FormInput name="companyLegalName" label="Company Legal Name *" register={register} errors={errors} required />
      {/* <FormInput name="tradeLicense" label="Trade License / CR Number" register={register} errors={errors} required />
      <FormInput name="vatNumber" label="VAT Number (if applicable)" register={register} errors={errors} /> */}
      <FormInput name="yearOfEstablishment" label="Year of Establishment" type="year" register={register} errors={errors} required />
      <FormInput name="companyAddress" label="Company Address" className="md:col-span-2" register={register} errors={errors} required />
      <SelectInput name="countryCity" watch={watch} label="Country / City" options={countries} register={register} errors={errors} required />
      <FormInput name="companyEmail" label="Company Email" type="email" register={register} errors={errors} required />
      <PhoneInput name="companyPhone" label="Company Phone Number" control={control} errors={errors} required />
      <FormInput name="website" label="Website  (URL)" register={register} errors={errors} />
    </>
  );
};

export default CompanyDetailsStep; 
