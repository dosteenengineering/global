"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select, { components, MenuListProps } from "react-select";
import { footerData } from "../client/Layout/data";
import BorderButton from "../common/BorderButton";

type OptionType = { label: string; value: string };

type FormValues = {
    name: string;
    companyName: string;
    email: string;
    contactNumber: string;
    solutionType: OptionType | null;
};

const solutionOptions: OptionType[] = footerData.solutionTypes.map((type) => ({
    label: type,
    value: type,
}));

const inputClass =
    "w-full bg-transparent border-0 border-b border-[#C2C2C2] pb-5 pt-1 text-15 3xl:text-19 font-poppins font-[300] -tracking-[2%] text-paragraph placeholder:text-paragraph focus:outline-none focus:border-[#1B2B6B] transition-colors";

// Traps wheel events so the list scrolls instead of the page
const MenuList = (props: MenuListProps<OptionType>) => {
    const listRef = useRef<HTMLDivElement | null>(null);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const el = listRef.current;
        if (!el) return;

        const { scrollTop, scrollHeight, clientHeight } = el;
        const atTop    = scrollTop === 0 && e.deltaY < 0;
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
                onWheel: handleWheel as unknown as React.WheelEventHandler<HTMLDivElement>,
            }}
        >
            {props.children}
        </components.MenuList>
    );
};

const FooterCallBackForm = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({ mode: "onTouched" });

    const onSubmit = (data: FormValues) => {
        console.log("Call Back Form Submission:", {
            ...data,
            solutionType: data.solutionType?.value ?? "",
        });
    };

    return (
        <div className="min-w-[300px] 3xl:min-w-[477px]">
            <h2 className="text-30 font-[500] text-secondary font-poppins leading-[0.96] mb-10">
                Get a Call Back
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-1">

                {/* Name */}
                <div className="pb-2 3xl:pb-5">
                    <input
                        type="text"
                        placeholder="Name*"
                        {...register("name", { required: "Name is required" })}
                        className={inputClass}
                    />
                    <p className="text-red-500 text-[12px] mt-1 min-h-[16px]">
                        {errors.name?.message ?? ""}
                    </p>
                </div>

                {/* Company Name */}
                <div className="pb-2 3xl:pb-5">
                    <input
                        type="text"
                        placeholder="Company Name"
                        {...register("companyName")}
                        className={inputClass}
                    />
                    <p className="text-red-500 text-[12px] mt-1 min-h-[16px]" />
                </div>

                {/* Email */}
                <div className="pb-2 3xl:pb-5">
                    <input
                        type="email"
                        placeholder="Email ID*"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })}
                        className={inputClass}
                    />
                    <p className="text-red-500 text-[12px] mt-1 min-h-[16px]">
                        {errors.email?.message ?? ""}
                    </p>
                </div>

                {/* Contact Number */}
                <div className="pb-5">
                    <input
                        type="tel"
                        placeholder="Contact Number*"
                        {...register("contactNumber", {
                            required: "Contact number is required",
                            pattern: {
                                value: /^[+\d\s\-()]{7,20}$/,
                                message: "Enter a valid contact number",
                            },
                        })}
                        className={inputClass}
                    />
                    <p className="text-red-500 text-[12px] mt-1 min-h-[16px]">
                        {errors.contactNumber?.message ?? ""}
                    </p>
                </div>

                {/* Solution Type — react-select */}
                <div>
                    <Controller
                        name="solutionType"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Select<OptionType>
                                {...field}
                                options={solutionOptions}
                                placeholder="Solution Type"
                                instanceId="solution-type"
                                classNamePrefix="rs"
                                unstyled
                                menuPosition="fixed"
                                menuPortalTarget={mounted ? document.body : null}
                                menuShouldBlockScroll
                                components={{ MenuList }}
                                classNames={{
                                    control: ({ isFocused }) =>
                                        `border-b pb-4 pt-1 cursor-pointer transition-colors ${
                                            isFocused ? "border-[#1B2B6B]" : "border-[#C2C2C2]"
                                        }`,
                                    placeholder: () =>
                                        "text-15 3xl:text-19 font-poppins font-[300] -tracking-[2%] text-paragraph",
                                    singleValue: () =>
                                        "text-15 3xl:text-19 font-poppins font-[300] -tracking-[2%] text-paragraph",
                                    indicatorSeparator: () => "hidden",
                                    dropdownIndicator: () => "text-secondary ml-2",
                                    menuPortal: () => "z-[9999]",
                                    menu: () =>
                                        "bg-[#F4F4F4] border border-[#C2C2C2] rounded-lg shadow-lg",
                                    menuList: () =>
                                        "py-1 max-h-[180px] overflow-y-scroll",
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
                    <p className="text-red-500 text-[12px] mt-1 min-h-[16px]" />
                </div>

                {/* Submit */}
                <div className="pt-10 w-fit">
                    <BorderButton
                        type="submit"
                        text="Submit"
                        borderColor="black"
                        iconColor="primary"
                        px="px-[35px]"
                        textColor="black"
                    />
                </div>
            </form>
        </div>
    );
};

export default FooterCallBackForm;