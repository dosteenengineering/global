import type { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export type Step = {
  id: string;
  label: string;
  title: string;
};

export type PartnerFormValues = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  whatsapp: string;
  companyLegalName: string;
  yearOfEstablishment: string;
  companyAddress: string;
  countryCity: string;
  companyEmail: string;
  companyPhone: string;
  website: string;
  businessType: string;
  productServices: string;
  annualCapacity: string;
  marketsServed: string[];
  minimumOrderQuantity: string;
  minimumOrderQuantitySpecify: string;
  relevantExperience: string;
  keyCertifications: string;
  pastProjects: string;
  brochure: FileList | null;
  technicalSpecSheet: FileList | null;
  uploadedDocuments: FileList | null;
  paymentTermsPreference: string;
  termsAccepted: boolean;
};

export type StepFormProps = {
  register: UseFormRegister<PartnerFormValues>;
  control: Control<PartnerFormValues>;
  errors: FieldErrors<PartnerFormValues>;
  watch: UseFormWatch<PartnerFormValues>;
};
