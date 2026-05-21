import { CheckboxGroup, FormInput, RadioGroup } from "./formFields";
import type { StepFormProps } from "./types";

const businessTypes = ["Manufacturer", "Distributor", "Subcontractor", "Importer", "Other"];
const productServices = [
  "Roller Shutters",
  "Dock Levellers",
  "Movable Partitions",
  "Architectural Shades",
  "Fire Curtains",
  "Garbage Chutes",
  "Forced Entry Systems",
  "Others",
];
const marketsServed = ["UAE", "Oman", "GCC", "Others"];

const BusinessInfoStep = ({ register, errors }: StepFormProps) => {
  return (
    <>
      <RadioGroup name="businessType" label="Business Type" options={businessTypes} register={register} className="md:col-span-2" />
      <CheckboxGroup name="productServices" label="Products/Services You Can Supply *" options={productServices} register={register} errors={errors} className="md:col-span-2" required />
      <FormInput name="annualCapacity" label="Annual Supply Capacity" register={register} errors={errors} />
      <CheckboxGroup name="marketsServed" label="Main Markets Served" options={marketsServed} register={register} errors={errors} required />
      <RadioGroup name="minimumOrderQuantity" label="Minimum Order Quantity (MOQ)" options={["Yes (specify):", "No, flexible order sizes"]} register={register} className="md:col-span-2" />
    </>
  );
};

export default BusinessInfoStep;

