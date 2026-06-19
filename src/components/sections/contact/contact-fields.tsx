import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const fieldBaseClassName =
  "mt-2 w-full rounded-lg border border-[#dfe5ec] bg-white px-3.5 py-3 font-sans text-sm font-medium text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/45 focus:ring-4 focus:ring-black/[0.04]";

function FieldShell({
  children,
  id,
  label,
}: {
  children: ReactNode;
  id: string;
  label: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-sans text-sm font-semibold text-black/72"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function TextField({
  className,
  id,
  label,
  ...props
}: ComponentPropsWithoutRef<"input"> & { id: string; label: string }) {
  return (
    <FieldShell id={id} label={label}>
      <input id={id} className={cn(fieldBaseClassName, className)} {...props} />
    </FieldShell>
  );
}

function TextAreaField({
  className,
  id,
  label,
  ...props
}: ComponentPropsWithoutRef<"textarea"> & { id: string; label: string }) {
  return (
    <FieldShell id={id} label={label}>
      <textarea
        id={id}
        className={cn(fieldBaseClassName, "min-h-32 resize-y", className)}
        {...props}
      />
    </FieldShell>
  );
}

function SelectField({
  className,
  id,
  label,
  options,
  ...props
}: ComponentPropsWithoutRef<"select"> & {
  id: string;
  label: string;
  options: string[];
}) {
  return (
    <FieldShell id={id} label={label}>
      <select id={id} className={cn(fieldBaseClassName, className)} {...props}>
        <option value="">Izberi možnost</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export { SelectField, TextAreaField, TextField };
