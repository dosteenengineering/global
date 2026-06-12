"use client";

import { useForm, Controller } from "react-hook-form";
import { InputField } from "@/app/components/common/InputField";
import { SelectField } from "@/app/components/common/SelectField";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import { TextAreaField } from "@/app/components/common/Textarea";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { moveUp } from "@/app/components/motionVariants";
import { useLenis } from "@/app/components/LenisProvider";

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
  const { scrollTo } = useLenis();

  useEffect(() => {
    if (window.location.hash !== "#contact-form") return;

    const timeout = setTimeout(() => {
      const el = document.getElementById("contact-form");
      if (el) scrollTo(el, { offset: -80, duration: 1.5 });
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="contact-form" className="container py-140 3xl:py-200 relative">
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
        className="max-w-[20ch] section-heading-90 mb-10 lg:mb-80"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Row 1 */}
        <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-x-30 gap-y-7.5 lg:gap-y-80 mb-80"
        >
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
        </motion.div>

        {/* Row 2 */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-x-30 gap-y-80 mb-80"
        >
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
        </motion.div>

        {/* Row 3 */}
        <motion.div
          variants={moveUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-30 mb-80"
        >
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
        </motion.div>

        {/* Row 4 — Project Brief full width */}
        <motion.div
          variants={moveUp(0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-10 lg:mb-80"
        >
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
                height="h-[50px] lg:h-[100px]"
              />
            )}
          />
        </motion.div>

        <motion.div
          variants={moveUp(0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <BorderButton
            text="Submit"
            borderColor="black"
            textColor="black"
            hoverBg="black"
            onClick={() => handleSubmit(onSubmit)()}
          />
        </motion.div>
      </form>
    </section>
  );
}
