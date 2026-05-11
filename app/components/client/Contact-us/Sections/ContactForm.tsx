"use client";

import { useForm, Controller } from "react-hook-form";
import { InputField } from "@/app/components/common/InputField";
import { SelectField } from "@/app/components/common/SelectField";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import { TextAreaField } from "@/app/components/common/Textarea";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormValues = {
  firstName: string;
  lastName: string;
  companyName: string;
  yourRole: string;
  email: string;
  phone: string;
  projectLocation: string;
  systemOfInterest: string;
  projectBrief: string;
};

const SYSTEM_OPTIONS = [
  "HVAC Systems",
  "Fire Protection",
  "Electrical Systems",
  "Plumbing",
  "Building Automation",
  "MEP Design",
  "Other",
];

// ─── Main Form ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      yourRole: "",
      email: "",
      phone: "",
      projectLocation: "",
      systemOfInterest: "",
      projectBrief: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  // Watch all fields so InputField re-renders on value change
  const values = watch();

  return (
    <section className="container py-140 3xl:py-200 relative">
      <div className="absolute bottom-[-35.3%] right-[-15%] 3xl:right-[-3.5%]">
        <Image
          src="/assets/images/contact-us/form-bg-svg.svg"
          alt="Layer 1"
          width={730}
          height={730}
          className="w-[80%] 3xl:w-full h-full object-contain"
        />
      </div>
      <SectionTitle
        title="Tell Us About Your Project"
        className="max-w-[20ch] section-heading mb-80"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-30 gap-y-80 mb-80">
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <InputField
                label="First Name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <InputField
                label="Last Name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <InputField
                label="Company Name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-30 gap-y-80 mb-80">
          <Controller
            name="yourRole"
            control={control}
            render={({ field }) => (
              <InputField
                label="Your Role"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <InputField
                label="Email"
                type="email"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputField
                label="Phone"
                type="tel"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-30 mb-80">
          <Controller
            name="projectLocation"
            control={control}
            render={({ field }) => (
              <InputField
                label="Project Location"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            name="systemOfInterest"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <SelectField
                label="System of Interest"
                value={field.value}
                onChange={field.onChange}
                options={SYSTEM_OPTIONS}
                error={errors.systemOfInterest?.message}
              />
            )}
          />
        </div>

        {/* Row 4 — Project Brief full width */}
        <div className="mb-80">
          <Controller
            name="projectBrief"
            control={control}
            render={({ field }) => (
              <TextAreaField
                label="Project Brief"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.projectBrief?.message}
                height="h-[100px]"
              />
            )}
          />
        </div>

        <div>
          <BorderButton
            text="Submit"
            borderColor="black"
            textColor="black"
            hoverBg="black"
            onClick={() => handleSubmit(onSubmit)()}
          />
        </div>
      </form>
    </section>
  );
}
