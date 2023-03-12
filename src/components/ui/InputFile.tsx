import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
// import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";

const defaultStyling = `flex w-full gap-3 justify-center items-center px-3 py-3 p-1 md:hover:cursor-pointer`;

const InputFile = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  }
>(({ className, label, ...props }, ref) => {
  return (
    <div className="w-full">
      <Button className="h-9 w-full overflow-hidden p-0" type="button">
        <label
          htmlFor="input_file"
          className={twMerge(defaultStyling, className)}
        >
          <span>{label ? label : "Upload file"}</span>
          {/* <ArrowUpTrayIcon className="w-5 h-5" /> */}
          <input
            id="input_file"
            placeholder="Placeholder .."
            ref={ref}
            type="file"
            className="hidden"
            autoComplete="off"
            {...props}
          />
        </label>
      </Button>
    </div>
  );
});

InputFile.displayName = "InputFile";

export { InputFile };
