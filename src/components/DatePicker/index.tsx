import { Calendar } from "@/components/Calendar";
import { Popover } from "@/components/Popover";
import { cn } from "@/lib/utils";
import { format, Locale } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";
import { Button } from "../Button";
import { DatePickerComponent, DatePickerProps } from "./types";

export const DatePicker: DatePickerComponent = ({
  variant = "primary",
  selected,
  onSelect,
  label,
  text,
  error,
  className,
  buttonProps,
  popoverProps,
  calendarProps,
  fnsFormatStr = "PPP",
  fnsLocale = ptBR as unknown as Locale,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>();
  const calendarBackground =
    variant === "primary" || variant === "secondary" ? "bg-white" : "";

  return (
    <Popover
      side={popoverProps?.side ?? "top"}
      variant={popoverProps?.variant ?? variant}
      trigger={
        <div className="flex flex-col items-start gap-1">
          {label && (
            <label className={"pl-0.5 font-medium text-sm"}>{label}</label>
          )}
          <Button
            as="span"
            className={cn("justify-start")}
            icon="calendar-dots"
            {...buttonProps}
          >
            {date
              ? format(date, fnsFormatStr, { locale: fnsLocale as Locale })
              : text}
          </Button>
          {error && (
            <span className="pl-0.5 text-red-500 text-xs">{error}</span>
          )}
        </div>
      }
      className={cn("text-unset px-0 py-0", className)}
      {...popoverProps}
    >
      <Calendar
        className={cn(calendarBackground, "py-2 px-1")}
        mode="single"
        selected={selected ?? date}
        // @ts-expect-error - `setDate` is not assignable to `onSelect`
        onSelect={onSelect ?? setDate}
        initialFocus
        {...calendarProps}
      />
    </Popover>
  );
};
