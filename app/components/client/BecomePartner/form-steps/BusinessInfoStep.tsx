import { CheckboxGroup, FormInput, RadioGroup } from "./formFields";
import type { StepFormProps } from "./types";

const businessTypes = ["Manufacturer", "Distributor", "Subcontractor", "Importer", "Other"];
// const productServices = [
//   "Roller Shutters",
//   "Dock Levellers",
//   "Movable Partitions",
//   "Architectural Shades",
//   "Fire Curtains",
//   "Garbage Chutes",
//   "Forced Entry Systems",
//   "Others",
// ];
const marketsServed = ["UAE", "Oman", "GCC", "Others"];

const BusinessInfoStep = ({ register, errors, watch }: StepFormProps) => {
  const minimumOrderQuantity = watch("minimumOrderQuantity");
  const showMoqAmount = minimumOrderQuantity === "Yes (specify):";
  return (
    <>
      <RadioGroup name="businessType" label="Business Type" options={businessTypes} register={register} className="md:col-span-2" />
      {/* <CheckboxGroup name="productServices" label="Products/Services You Can Supply *" options={productServices} register={register} errors={errors}
        className="md:col-span-2 mt-[20px]" required legendFontSize="text-30" legendColor="text-secondary" /> */}
        <FormInput name="productServices" label="Products/Services You Can Supply *" register={register} errors={errors} required className="md:col-span-2"/>
      <FormInput name="annualCapacity" label="Annual Supply Capacity" register={register} errors={errors} required/>
      <CheckboxGroup name="marketsServed" label="Main Markets Served" options={marketsServed} register={register} errors={errors} required
        legendFontSize="text-19" legendColor="text-paragraph" legendMarginBottom="mb-3"
        legendLineHeight="leading-[1.684210526315789]" />
      <RadioGroup name="minimumOrderQuantity" label="Minimum Order Quantity (MOQ)" options={["Yes (specify):", "No, flexible order sizes"]} register={register} className="md:col-span-2" />
      {showMoqAmount && (
        <FormInput
          name="minimumOrderQuantitySpecify"
          label="Specify MOQ"
          register={register}
          errors={errors}
          required
        />
      )}
    </>
  );
};

export default BusinessInfoStep;

