// ─── Reusable InputField ──────────────────────────────────────────────────────

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: () => void;
  type?: string;
  error?: string;
};

export function InputField({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  error,
}: InputFieldProps) {
  const hasValue = value && value.length > 0;

  return (
    <div className="relative w-full group">
      {/* Label — always fixed, never moves */}
      <span className="block text-description text-paragraph mb-[33px]">
        {label}
      </span>

      {/* Input — absolute, sits 1px below label (top = 13px label + 1px) */}

        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="absolute left-0 right-0 bottom-0 w-full bg-transparent
            text-15 leading-[2.133] text-paragraph outline-none border-none p-0"
        />


      {/* Bottom border */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-[#c2c2c2]
        group-focus-within:bg-secondary transition-colors duration-300
        ${error ? "bg-red-400" : ""}`}
      />

      {error && (
        <p className="absolute -bottom-5 left-0 text-[12px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
