import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { forwardRef } from "react";
import { switchStyles } from "./styles";
import { SwitchComponent, SwitchProps } from "./types";

export const Switch: SwitchComponent = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, onChange, iconOn, iconOff, label, ...props }, ref) => {
  const inputId = props.id ?? Math.random().toString();

  return (
    <div className="flex items-center space-x-2">
      <SwitchPrimitives.Root
        className={cn(switchStyles({ variant, className }))}
        {...props}
        ref={ref}
        onCheckedChange={onChange ?? props.onCheckedChange}
        id={inputId}
      >
        {typeof iconOn === "string" && (
          <div
            className={cn(
              "p-1 text-background absolute top-1/3 right-1/3 transform -translate-x-[3px] -translate-y-[0.475rem]"
            )}
          >
            {IconsMap[iconOn]}
          </div>
        )}
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 z-50"
          )}
        />
        {typeof iconOff === "string" && (
          <div
            className={cn(
              "p-1 text-black absolute top-1/3 left-1/3 transform -translate-x-[-3px] -translate-y-[0.475rem]"
            )}
          >
            {IconsMap[iconOff]}
          </div>
        )}
      </SwitchPrimitives.Root>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
});
