"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select, { components, MenuListProps } from "react-select";
import { footerData } from "../client/Layout/data";
import BorderButton from "../common/BorderButton";
import { motion } from "framer-motion";
import { moveUp } from "../motionVariants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  footerCallbackSchema,
  FooterCallbackFormValues,
} from "@/lib/validations/footerCallbackSchema";
import { sendFooterCallbackAction } from "@/lib/mail/actions/sendFooterCallbackAction";
import { toast } from "sonner";

type OptionType = { label: string; value: string };

const solutionOptions: OptionType[] = footerData.solutionTypes.map((type) => ({
  label: type,
  value: type,
}));

const inputClass =
  "w-full bg-transparent border-0 border-b border-[#C2C2C2] pb-3 md:pb-5 text-[15px] md:text-[16px] 3xl:text-19 font-poppins font-[300] -tracking-[2%] text-paragraph placeholder:text-paragraph focus:outline-none focus:border-[#1B2B6B] transition-colors";

// Traps wheel events so the list scrolls instead of the page
const MenuList = (props: MenuListProps<OptionType>) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const atTop = scrollTop === 0 && e.deltaY < 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

    if (!atTop && !atBottom) {
      e.preventDefault();
      e.stopPropagation();
      el.scrollTop += e.deltaY;
    }
  };

  return (
    <components.MenuList
      {...props}
      innerRef={(node) => {
        listRef.current = node;
        if (typeof props.innerRef === "function") props.innerRef(node);
      }}
      innerProps={{
        ...props.innerProps,
        onWheel:
          handleWheel as unknown as React.WheelEventHandler<HTMLDivElement>,
      }}
    >
      {props.children}
    </components.MenuList>
  );
};

const FooterCallBackForm = ({ hideTitle }: { hideTitle?: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FooterCallbackFormValues>({
    resolver: zodResolver(footerCallbackSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FooterCallbackFormValues) => {
    setFormStatus("idle");
    const result = await sendFooterCallbackAction(data);
    if (result.success) {
      setFormStatus("success");
      toast.success("Enquiry sent successfully!");
      reset();
    } else {
      setFormStatus("error");
      toast.error("Failed to send enquiry. Please try again.");
    }
  };

  const isMobile =
    mounted && typeof window !== "undefined" && window.innerWidth < 768;
  const selectRef = useRef<any>(null);
  return (
    <div className="min-w-[250px] 2xl:min-w-[300px] 3xl:min-w-[477px]">
      {!hideTitle && (
        <motion.h2
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1, once: true }}
          className="text-[22px] lg:text-30 font-[500] text-secondary font-poppins leading-[0.96] mb-8 md:mb-10"
        >
          Get a Call Back
        </motion.h2>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <motion.div
          variants={moveUp(0.25)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1, once: true }}
          className="pb-2 3xl:pb-5"
        >
          <input
            type="text"
            placeholder="Name*"
            {...register("name")}
            className={inputClass}
          />
          <p className="text-red-500 text-[12px] mt-1 min-h-[18px]">
            {errors.name?.message ?? ""}
          </p>
        </motion.div>

        {/* Company Name */}
        <motion.div
          variants={moveUp(0.33)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1, once: true }}
          className="pb-2 3xl:pb-5"
        >
          <input
            type="text"
            placeholder="Company Name"
            {...register("companyName")}
            className={inputClass}
          />
          <p className="text-red-500 text-[12px] mt-1 min-h-[18px]" />
        </motion.div>

        {/* Email */}
        <motion.div
          variants={moveUp(0.41)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1, once: true }}
          className="pb-2 3xl:pb-5"
        >
          <input
            type="email"
            placeholder="Email ID*"
            {...register("email")}
            className={inputClass}
          />
          <p className="text-red-500 text-[12px] mt-1 min-h-[18px]">
            {errors.email?.message ?? ""}
          </p>
        </motion.div>

        {/* Contact Number */}
        <motion.div
          variants={moveUp(0.48)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1, once: true }}
          className="pb-5"
        >
          <input
            type="tel"
            placeholder="Contact Number*"
            {...register("contactNumber")}
            className={inputClass}
          />
          <p className="text-red-500 text-[12px] mt-1 min-h-[18px]">
            {errors.contactNumber?.message ?? ""}
          </p>
        </motion.div>

        <motion.div
          variants={moveUp(0.55)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1, once: true }}
          className="relative cursor-pointer"
        >
          <Controller
            name="solutionType"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Select<OptionType>
                ref={selectRef}
                openMenuOnFocus
                value={
                  solutionOptions.find((o) => o.value === field.value) ?? null
                }
                onChange={(selected) => field.onChange(selected?.value ?? "")}
                onBlur={field.onBlur}
                options={solutionOptions}
                placeholder="Solution Type"
                instanceId={hideTitle ? "solution-type-popup" : "solution-type"}
                classNamePrefix="rs"
                unstyled
                isSearchable={false}
                menuPosition={hideTitle ? "absolute" : "fixed"}
                menuPortalTarget={
                  hideTitle ? undefined : mounted ? document.body : null
                }
                menuShouldBlockScroll={!hideTitle}
                menuPlacement={hideTitle ? "top" : "auto"}
                components={{ MenuList }}
                classNames={{
                  control: ({ isFocused }) =>
                    `border-b pb-4 pt-1 cursor-pointer transition-colors ${isFocused ? "border-[#1B2B6B]" : "border-[#C2C2C2]"}`,
                  container: () => "cursor-pointer",
                  valueContainer: () => "cursor-pointer",
                  input: () => "cursor-pointer",
                  placeholder: () =>
                    "text-[15px] md:text-[16px] 3xl:text-19 font-poppins font-[300] -tracking-[2%] text-paragraph placeholder:text-paragraph",
                  singleValue: () =>
                    "text-[15px] md:text-[16px] 3xl:text-19 font-poppins font-[300] -tracking-[2%] text-paragraph placeholder:text-paragraph",
                  indicatorSeparator: () => "hidden",
                  dropdownIndicator: () => "!hidden",
                  menuPortal: () => "z-[10000]",
                  menu: () =>
                    "bg-[#F4F4F4] border border-[#C2C2C2] rounded-lg shadow-lg",
                  menuList: () =>
                    `py-1 overflow-y-scroll ${isMobile ? "h-[285px] pt-3" : "max-h-[180px]"}`,
                  option: ({ isFocused, isSelected }) =>
                    `px-4 py-2 text-[13px] font-poppins font-[300] cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#1B2B6B] text-white"
                        : isFocused
                          ? "bg-[#E2E2DE] text-secondary"
                          : "text-secondary"
                    }`,
                }}
              />
            )}
        
          />
          {/* 👇 Custom arrow — sits in the already-relative wrapper */}
          <span className="cursor-pointer absolute right-0 top-[15px]" onClick={() => selectRef.current?.focus()}>
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_434_443)">
                <path
                  d="M16.7417 1.19727L8.98329 8.80351L1.25586 1.22317"
                  stroke="#161616"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_434_443">
                  <rect width="18" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>


          <p className="text-red-500 text-[12px] mt-1 min-h-[18px]" />
        </motion.div>

        {/* Submit */}
        <motion.div
          variants={moveUp(0.63)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1, once: true }}
          className="pt-5 md:pt-6 lg:pt-[22px] w-fit"
        >
          <BorderButton
            type="submit"
            text={isSubmitting ? "Submitting..." : "Submit"}
            borderColor="black"
            iconColor="primary"
            px="px-30 3xl:px-[35px]"
            textColor="black"
            hoverBg="black"
            disabled={isSubmitting}
          />
        </motion.div>
      </form>
    </div>
  );
};

export default FooterCallBackForm;
