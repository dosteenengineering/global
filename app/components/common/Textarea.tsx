type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  rows?: number;
  error?: string;
  height?: string;
};

export function TextAreaField({
  label,
  value,
  onChange,
  onBlur,
  rows = 4,
  error,
  height="",
}: TextAreaFieldProps) {
  return (
    <div className="relative w-full group pb-px">
      {/* Label — fixed at top, same as InputField */}
      <span className="block text-description text-paragraph">
        {label}
      </span>

      {/* Textarea — flows naturally, pushes border down */}
      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        className={`w-full bg-transparent text-15 leading-[2.133] text-paragraph
          outline-none border-none p-0 resize-none block ${height} `}
      />

      {/* Bottom border — sits flush after textarea */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-[#c2c2c2]
          group-focus-within:bg-secondary transition-colors duration-300
          ${error ? "!bg-red-400" : ""}`}
      />

      {error && (
        <p className="absolute -bottom-5 left-0 text-[12px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}