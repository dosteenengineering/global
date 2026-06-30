"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import BorderButton from "@/app/components/common/BorderButton";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";

// ─── Types ──────────────────────────────────────────────────────────────────

type DownloadGateFormValues = {
  name: string;
  email: string;
  contactNumber: string;
};

type DownloadGateProps = {
  fileUrl: string;
  fileName: string;
  onClose: () => void;
};

// ─── Shared input class (mirrors your existing form) ────────────────────────

const inputClass =
  "w-full border-b border-[#C2C2C2] pb-4 pt-1 text-[15px] md:text-[16px] 3xl:text-19 font-poppins font-[300] -tracking-[0.02em] text-secondary placeholder:text-paragraph focus:outline-none focus:border-[#1B2B6B] transition-colors bg-transparent";

// ─── Component ──────────────────────────────────────────────────────────────

const DownloadGate = ({ fileUrl, fileName, onClose }: DownloadGateProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DownloadGateFormValues>();

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Escape key closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const onSubmit = async (values: DownloadGateFormValues) => {
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/admin/download-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, fileUrl, fileName }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(
          data.message ?? "Something went wrong. Please try again.",
        );
        return;
      }

      // Trigger download
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onClose();
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-[540px] bg-white px-[30px] py-[40px] md:px-[50px] md:py-[56px]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <SecondaryNoise />
        {/* Close */}
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-0 top-0 flex h-9 w-9 border border-secondary rounded-full items-center justify-center text-secondary transition-colors hover:text-primary group hover:border-primary duration-300"
          >
            <X size={20} strokeWidth={1.5} className="group-hover:scale-125 transition-transform duration-300" />
          </button>
          {/* Heading */}
          <motion.div variants={moveUp(0.1)} initial="hidden" animate="show">
            <h2 className="font-poppins text-[22px] md:text-[28px] font-light leading-[1.3] tracking-[-0.02em] text-secondary mb-2">
              Download File
            </h2>
            <p className="font-poppins text-[14px] md:text-[15px] font-light leading-[1.6] text-paragraph mb-[50px]">
              Please fill in your details to download.
            </p>
          </motion.div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name */}
            <motion.div
              variants={moveUp(0.18)}
              initial="hidden"
              animate="show"
              className="pb-2 3xl:pb-5"
            >
              <input
                type="text"
                placeholder="Name*"
                {...register("name", { required: "Name is required" })}
                className={inputClass}
              />
              <p className="text-red-500 text-[12px] mt-1 min-h-[18px]">
                {errors.name?.message ?? ""}
              </p>
            </motion.div>
            {/* Email */}
            <motion.div
              variants={moveUp(0.26)}
              initial="hidden"
              animate="show"
              className="pb-2 3xl:pb-5"
            >
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
              <p className="text-red-500 text-[12px] mt-1 min-h-[18px]">
                {errors.email?.message ?? ""}
              </p>
            </motion.div>
            {/* Contact Number */}
            <motion.div
              variants={moveUp(0.34)}
              initial="hidden"
              animate="show"
              className="pb-5"
            >
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
              <p className="text-red-500 text-[12px] mt-1 min-h-[18px]">
                {errors.contactNumber?.message ?? ""}
              </p>
            </motion.div>
            {/* Server error */}
            {serverError && (
              <p className="text-red-500 text-[12px] mb-4 -mt-2">
                {serverError}
              </p>
            )}
            {/* Submit */}
            <motion.div
              variants={moveUp(0.42)}
              initial="hidden"
              animate="show"
              className="pt-2 w-fit"
            >
              <BorderButton
                type="submit"
                text={submitting ? "Submitting…" : "Download"}
                borderColor="black"
                iconColor="primary"
                px="px-30 3xl:px-[35px]"
                textColor="black"
                hoverBg="black"
              />
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DownloadGate;

export const useDownloadGate = () => {
  const [pending, setPending] = useState<{
    fileUrl: string;
    fileName: string;
  } | null>(null);

  const openGate = (fileUrl: string, fileName: string) => {
    setPending({ fileUrl, fileName });
  };

  const closeGate = () => setPending(null);

  const gateElement = (
    <AnimatePresence>
      {pending && (
        <DownloadGate
          key="download-gate"
          fileUrl={pending.fileUrl}
          fileName={pending.fileName}
          onClose={closeGate}
        />
      )}
    </AnimatePresence>
  );

  return { openGate, gateElement };
};
