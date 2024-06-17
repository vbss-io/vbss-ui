import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export type IconProps = ComponentProps<"div"> & {
  icon: keyof typeof IconsMap;
};

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex w-full", className)} {...props}>
        {IconsMap[icon]}
      </div>
    );
  }
);
