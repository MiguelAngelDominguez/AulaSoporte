import type { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Field({ label, error, id, className = "", ...props }: FieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${error ? "border-red-400" : "border-slate-300"} ${className}`}
        {...props}
      />
      {error && (
        <p id={`${fieldId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
