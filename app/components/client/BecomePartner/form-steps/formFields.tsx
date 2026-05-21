import { ChevronDown, Paperclip } from "lucide-react";
import CountryCodeSelect from "@/app/components/common/CountryCodeSelect";
import { Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { PartnerFormValues } from "./types";

type BaseFieldProps = {
  name: keyof PartnerFormValues;
  label: string;
  register: UseFormRegister<PartnerFormValues>;
  errors: FieldErrors<PartnerFormValues>;
  required?: boolean;
  className?: string;
};


// const defaultDialCode = "+971";

// const getLocalPhoneNumber = (value: unknown, selectedCode: string) => {
//   if (typeof value !== "string") return "";

//   const trimmedValue = value.trim();
//   if (trimmedValue.startsWith(selectedCode)) {
//     return trimmedValue.slice(selectedCode.length).trimStart();
//   }

//   const matchedCode = [...countryDialCodes]
//     .sort((a, b) => b.length - a.length)
//     .find((code) => trimmedValue.startsWith(code));

//   if (matchedCode) {
//     return trimmedValue.slice(matchedCode.length).trimStart();
//   }

//   return trimmedValue;
// };

// const getDialCodeFromValue = (value: unknown) => {
//   if (typeof value !== "string") return defaultDialCode;

//   return (
//     [...countryDialCodes]
//       .sort((a, b) => b.length - a.length)
//       .find((code) => value.trim().startsWith(code)) ?? defaultDialCode
//   );
// };

export const FormInput = ({
  name,
  label,
  register,
  errors,
  required = false,
  type = "text",
  className = "",
}: BaseFieldProps & { type?: string }) => {
  const error = errors[name]?.message;

  return (
    <label className={`block ${className}`}>
      <span className="block text-19 leading-[1.684210526315789] font-light text-paragraph">{label}</span>
      <input
        type={type}
        {...register(name, required ? { required: "Required" } : undefined)}
        className="h-7 w-full border-0 border-b border-[#CFCFCF] bg-transparent px-0 text-16 text-secondary outline-none transition-colors focus:border-primary"
      />
      {error && <span className="mt-2 block text-12 text-red-500">{error}</span>}
    </label>
  );
};

// export const SelectInput = ({
//   name,
//   label,
//   register,
//   errors,
//   required = false,
//   className = "",
//   options
// }: SelectProps) => {
//   const error = errors[name]?.message;

//   return (
//     <label className={`block ${className}`}>
//       <span className="block text-15 leading-[1.5] text-paragraph">{label}</span>
//       <div className="mt-20 flex h-8 items-center border-b border-[#CFCFCF] transition-colors focus-within:border-primary">
//         <select
//           {...register(name, required ? { required: "Required" } : undefined)}
//           className="h-full min-w-0 flex-1 border-0 bg-transparent px-0 text-16 text-secondary outline-none appearance-none cursor-pointer"
//         >
//           <option value="" disabled>Select {label}</option>
//           {options.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//         <ChevronDown size={16} strokeWidth={1.5} className="shrink-0 text-secondary pointer-events-none" />
//       </div>
//       {error && <span className="mt-2 block text-12 text-red-500">{error}</span>}
//     </label>
//   );
// };

export const PhoneInput = ({
  name,
  label,
  control,
  errors,
  required = false,
}: {
  name: keyof PartnerFormValues;
  label: string;
  control: Control<PartnerFormValues>;
  errors: FieldErrors<PartnerFormValues>;
  required?: boolean;
}) => {
  const error = errors[name]?.message;

  return (
    <label className="block">
      <span className="block text-19 leading-[1.684210526315789] font-light text-paragraph">{label}</span>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: "Required" } : undefined}
        render={({ field }) => (
          <PhoneInputControl value={field.value} name={field.name} onChange={field.onChange} onBlur={field.onBlur} />
        )}
      />
      {error && <span className="mt-2 block text-12 text-red-500">{error}</span>}
    </label>
  );
};

const PhoneInputControl = ({
  value,
  name,
  onChange,
  onBlur,
}: {
  value: unknown;
  name: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) => {
  const [selectedCode, setSelectedCode] = useState("+971");

  const phoneRowRef = useRef<HTMLDivElement | null>(null);
  const [phoneRowWidth, setPhoneRowWidth] = useState(0);

  useEffect(() => {
    if (!phoneRowRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setPhoneRowWidth(phoneRowRef.current?.offsetWidth ?? 0);
    });

    resizeObserver.observe(phoneRowRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={phoneRowRef}
      className="flex items-end pt-[3px] md:pt-20 gap-2 border-b border-[#CFCFCF]"
    >
      <CountryCodeSelect
        value={selectedCode}
        onChange={setSelectedCode}
        dropdownWidth={phoneRowWidth}
      />

      <div className="overflow-x-hidden flex-1">
        <input
          type="tel"
          name={name}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete="tel"
          className="w-full pl-[100px] border-none pb-[5px] outline-none bg-transparent text-16 text-secondary"
        />
      </div>
    </div>
  );
};

export const RadioGroup = ({
  name,
  label,
  options,
  register,
  className = "",
}: {
  name: keyof PartnerFormValues;
  label: string;
  options: string[];
  register: UseFormRegister<PartnerFormValues>;
  className?: string;
}) => {
  return (
    <fieldset className={className}>
      <legend className="mb-20 text-15 leading-[1.5] text-secondary">{label}</legend>
      <div className="flex flex-wrap gap-x-35 gap-y-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 text-13 leading-none text-secondary">
            <input type="radio" value={option} {...register(name)} className="h-3.5 w-3.5 accent-primary" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export const CheckboxGroup = ({
  name,
  label,
  options,
  register,
  errors,
  required = false,
  className = "",
}: {
  name: keyof PartnerFormValues;
  label: string;
  options: string[];
  register: UseFormRegister<PartnerFormValues>;
  errors: FieldErrors<PartnerFormValues>;
  required?: boolean;
  className?: string;
}) => {
  const error = errors[name]?.message;

  return (
    <fieldset className={className}>
      <legend className="mb-20 text-15 leading-[1.5] text-secondary">{label}</legend>
      <div className="flex flex-wrap gap-x-35 gap-y-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 text-13 leading-none text-paragraph">
            <input
              type="checkbox"
              value={option}
              {...register(name, required ? { required: "Required" } : undefined)}
              className="h-3.5 w-3.5 accent-primary"
            />
            {option}
          </label>
        ))}
      </div>
      {error && <span className="mt-2 block text-12 text-red-500">{error}</span>}
    </fieldset>
  );
};

export const FileInput = ({
  name,
  label,
  helper,
  register,
  errors,
  className = "",
}: BaseFieldProps & { helper: string }) => {
  const error = errors[name]?.message;

  return (
    <label className={`block ${className}`}>
      <span className="block text-15 leading-[1.5] text-paragraph">{label}</span>
      <div className="mt-20 flex h-8 items-center border-b border-[#CFCFCF]">
        <input type="file" {...register(name)} className="min-w-0 flex-1 text-12 text-paragraph file:hidden" />
        <Paperclip size={16} strokeWidth={1.5} className="shrink-0 text-paragraph" />
      </div>
      <span className="mt-1 block text-11 leading-[1.45] text-paragraph">{helper}</span>
      {error && <span className="mt-2 block text-12 text-red-500">{error}</span>}
    </label>
  );
};
