import { FormInput, PhoneInput } from "./formFields";
import type { StepFormProps } from "./types";


const PersonalInfoStep = ({ register, control, errors }: StepFormProps) => {

  return (
    <>
      <FormInput name="fullName" label="Full Name *" register={register} errors={errors} required />
      <FormInput name="jobTitle" label="Job Title / Position *" register={register} errors={errors} required />
      <FormInput name="email" label="Email Address *" className="md:col-span-2" type="email" register={register} errors={errors} required />
      <PhoneInput name="phone" label="Phone Number *" control={control} errors={errors} required />
      <PhoneInput name="whatsapp" label="WhatsApp Number(Optional)" control={control} errors={errors} />
    </>
  );
};

export default PersonalInfoStep;
