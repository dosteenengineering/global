"use client";

import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BusinessInfoStep from "./form-steps/BusinessInfoStep";
import CompanyDetailsStep from "./form-steps/CompanyDetailsStep";
import ExperienceDocsStep from "./form-steps/ExperienceDocsStep";
import PersonalInfoStep from "./form-steps/PersonalInfoStep";
import type { PartnerFormValues, Step } from "./form-steps/types";
import ThankYouModal from "./ThankyouModal";

const steps: Step[] = [
  {
    id: "personal",
    label: "Personal Info",
    title: "Personal & Contact Information",
  },
  {
    id: "company",
    label: "Company Profile",
    title: "Company Details",
  },
  {
    id: "business",
    label: "Business Info",
    title: "Business Type & Product Categories",
  },
  {
    id: "docs",
    label: "Experience Docs",
    title: "Experience, Certifications & Documents",
  },
];

const defaultValues: PartnerFormValues = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  whatsapp: "",
  companyLegalName: "",
  tradeLicense: "",
  vatNumber: "",
  yearOfEstablishment: "",
  companyAddress: "",
  countryCity: "",
  companyEmail: "",
  companyPhone: "",
  website: "",
  businessType: "Manufacturer",
  productServices: ["Roller Shutters"],
  annualCapacity: "",
  marketsServed: ["UAE"],
  minimumOrderQuantity: "Yes (specify):",
  relevantExperience: "",
  keyCertifications: "",
  pastProjects: "",
  brochure: null,
  technicalSpecSheet: null,
  uploadedDocuments: null,
  paymentTermsPreference: "",
  termsAccepted: false,
};

const stepFields: Record<string, (keyof PartnerFormValues)[]> = {
  personal: ["fullName", "jobTitle", "email", "phone"],
  company: ["companyLegalName", "tradeLicense", "yearOfEstablishment", "companyAddress", "countryCity", "companyEmail", "companyPhone"],
  business: ["businessType", "productServices", "marketsServed"],
  docs: ["termsAccepted"],
};

const PartnerForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    register,
    control,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<PartnerFormValues>({ defaultValues });

  const goToNextStep = async () => {
    const isValid = await trigger(stepFields[currentStep.id]);

    if (isValid) {
      setActiveStep((step) => Math.min(step + 1, steps.length - 1));
    }
  };

  const onSubmit = (values: PartnerFormValues) => {
    console.log("Partner form:", values);
    setIsSubmitted(true)
  };

  const renderStep = () => {
    const stepProps = { register, control, watch, errors };
    switch (currentStep.id) {
      case "company":
        return <CompanyDetailsStep {...stepProps} />;
      case "business":
        return <BusinessInfoStep {...stepProps} />;
      case "docs":
        return <ExperienceDocsStep {...stepProps} />;
      default:
        return <PersonalInfoStep {...stepProps} />;
    }
  };

  return (
    <>
      <ThankYouModal isOpen={isSubmitted} />
      <div className="h-full">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex min-h-full flex-col pt-70 xl:pt-80  h-full  ">
          <Stepper activeStep={activeStep} />
          <h2 className="mt-50 mb-50  text-[36px] leading-[1.12] text-secondary font-light md:text-55">
            {currentStep.title}
          </h2>
          <div className="max-h-[60vh] h-full overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-10 " data-lenis-prevent-wheel>
            <div className="grid grid-cols-1 gap-x-60 gap-y-40 md:grid-cols-2 ">
              {renderStep()}
            </div>
            <div className="mt-50 flex items-center gap-4">
              {!isFirstStep && (
                <button type="button" onClick={() => setActiveStep((step) => Math.max(step - 1, 0))}
                  className="group flex h-[42px] items-center justify-center gap-3 rounded-full border border-[#454545] px-6 text-13 uppercase text-secondary transition-colors hover:bg-secondary hover:text-white"
                >
                  <ArrowLeft size={16} strokeWidth={1.6} />
                  Back
                </button>
              )}

              <button
                type={isLastStep ? "submit" : "button"}
                onClick={(event) => {
                  if (!isLastStep) {
                    event.preventDefault();
                    goToNextStep();
                  }
                }}
                className="group flex h-[42px] items-center justify-center gap-3 rounded-full border border-[#454545] px-6 text-13 uppercase text-secondary transition-colors hover:bg-secondary hover:text-white"
              >
                {isLastStep ? "Submit Vendor Registration" : "Next"}
                <ArrowUpRight size={18} strokeWidth={1.6} className="text-primary transition-colors group-hover:text-white" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const Stepper = ({ activeStep }: { activeStep: number }) => {
  return (
    <div className="relative flex w-full justify-between">
      <span className="absolute left-[58px] right-[73px] top-[14px] h-px bg-bdr-gray xl:top-[20px]">
        <span
          className="block h-full bg-primary transition-[width]"
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />
      </span>
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isComplete = index < activeStep;
        return (
          <button
            key={step.id}
            type="button"
            className="group relative z-1 flex w-fit flex-col items-center gap-5"
          >
            <span
              className={`relative z-1 flex h-7 w-7 xl:w-[42px] xl:h-[42px] items-center justify-center rounded-full border text-13 font-light transition-colors ${isActive || isComplete
                  ? "border-primary bg-primary text-white"
                  : "border-[#DDE3F2] bg-white text-paragraph"
                }`}
            >
              {isComplete ? <Check size={15} strokeWidth={2} /> : index + 1}
            </span>
            <span className={`w-fit text-center text-14 leading-[1.4] transition-colors ${isActive ? "text-secondary" : "text-paragraph"}`}>
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PartnerForm;
