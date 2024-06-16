import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const switchStyles = cva(
  "peer inline-flex relative h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50  data-[state=unchecked]:bg-gray-200",
  {
    variants: {
      variant: {
        primary: "border-transparent data-[state=checked]:bg-primary",
        secondary: "border-transparent data-[state=checked]:bg-secondary",
        outline: "border-primary data-[state=checked]:bg-primary",
        bw: "border-transparent data-[state=checked]:bg-black",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> &
  VariantProps<typeof switchStyles> & {
    onChange?: (checked: boolean) => void;
    iconOn?: keyof typeof IconsMap;
    iconOff?: keyof typeof IconsMap;
    label?: string;
  };

const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, onChange, iconOn, iconOff, label, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <SwitchPrimitives.Root
        className={cn(switchStyles({ variant, className }))}
        {...props}
        ref={ref}
        onCheckedChange={onChange ?? props.onCheckedChange}
      >
        {iconOn && (
          <div
            className={cn(
              "p-1 text-background absolute top-1/3 right-1/3 transform -translate-x-[3px] -translate-y-[0.475rem]"
            )}
          >
            {typeof iconOn === "string" ? IconsMap[iconOn] : iconOn}
          </div>
        )}
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 z-50"
          )}
        />
        {iconOff && (
          <div
            className={cn(
              "p-1 text-black absolute top-1/3 left-1/3 transform -translate-x-[-3px] -translate-y-[0.475rem]"
            )}
          >
            {typeof iconOff === "string" ? IconsMap[iconOff] : iconOff}
          </div>
        )}
      </SwitchPrimitives.Root>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
    </div>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
