import { Calendar } from "@/components/Calendar";
import { Popover } from "@/components/Popover";
import { cn } from "@/lib/utils";
import { format, Locale } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ComponentProps, forwardRef, useState } from "react";
import { Button } from "../Button";

type DatePickerProps = ComponentProps<"div"> & {
  variant?: "primary" | "secondary" | "outline";
  buttonProps?: Omit<ComponentProps<typeof Button>, "icon">;
  popoverProps?: ComponentProps<typeof Popover>;
  calendarProps?: ComponentProps<typeof Calendar>;
  label: string;
  fnsFormatStr?: string;
  fnsLocale?: Locale;
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      variant,
      label,
      className,
      buttonProps,
      popoverProps,
      calendarProps,
      fnsFormatStr = "PPP",
      fnsLocale = ptBR,
    },
    ref
  ) => {
    const [date, setDate] = useState<Date | undefined>();
    const calendarBackground =
      variant === "primary" || variant === "secondary" ? "bg-white" : "";

    return (
      <Popover
        ref={ref}
        side={popoverProps?.side ?? "top"}
        variant={popoverProps?.variant ?? variant}
        trigger={
          <Button
            className={cn("justify-start")}
            icon="calendar-dots"
            {...buttonProps}
          >
            {date
              ? format(date, fnsFormatStr, { locale: fnsLocale as Locale })
              : label}
          </Button>
        }
        className={cn("text-unset px-0 py-0", className)}
        {...popoverProps}
      >
        <Calendar
          className={cn(calendarBackground, "py-2 px-1")}
          mode="single"
          selected={date}
          // @ts-expect-error - `setDate` is not assignable to `onSelect`
          onSelect={setDate}
          initialFocus
          {...calendarProps}
        />
      </Popover>
    );
  }
);
