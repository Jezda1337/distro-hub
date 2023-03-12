import * as React from "react";
import { twMerge } from "tailwind-merge";

const defaultStyling = `w-full border rounded py-2 pr-7 px-3 h-9 focus:outline-black`;

type InputProps = {
  label?: string;
  prefix?: boolean;
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & InputProps
>(({ className, label, prefix, ...props }, ref) => {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-1 inline-block text-base">{label}</label>
      ) : null}
      <div className="flex w-full">
        {prefix ? (
          <span className="inline-flex h-9 items-center rounded-l-md border border-r-0 px-3 text-slate-500">
            https://
          </span>
        ) : null}

        <input
          placeholder="Placeholder .."
          className={twMerge(defaultStyling, className)}
          ref={ref}
          type="text"
          autoComplete="off"
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
