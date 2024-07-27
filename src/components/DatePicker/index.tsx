import { Popover } from "@/components/Popover";
import { cn } from "@/lib/utils";
import { format, Locale } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ReactNode } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { Tooltip } from "../Tooltip";
import { DatePickerComponent, DatePickerProps } from "./types";

export const DatePicker: DatePickerComponent = ({
  variant = "primary",
  selectedDate,
  onSelectDate,
  mode = "single",
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
            {getDateText(text, selectedDate, fnsFormatStr, fnsLocale)}
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
        mode={mode}
        className={cn(calendarBackground, "py-2 px-1")}
        initialFocus
        selected={selectedDate}
        onSelect={onSelectDate}
        {...calendarProps}
      />
    </Popover>
  );
};

export const getDateText = (
  text: string,
  selectedDate: Date | Date[] | DateRange,
  fnsFormatStr: string,
  fnsLocale: Locale
): ReactNode => {
  if (selectedDate instanceof Date) {
    return format(selectedDate, fnsFormatStr, { locale: fnsLocale as Locale });
  }
  if (Array.isArray(selectedDate) && selectedDate.length) {
    return (
      <Tooltip trigger={<span>{selectedDate.length} dates selected</span>}>
        <div className="flex flex-col gap-1">
          {selectedDate.map((date, index) => (
            <span key={index}>
              {format(date, fnsFormatStr, { locale: fnsLocale as Locale })}
            </span>
          ))}
        </div>
      </Tooltip>
    );
  }
  if (
    typeof selectedDate === "object" &&
    "from" in selectedDate &&
    "to" in selectedDate
  ) {
    const { from, to } = selectedDate;
    const fromText =
      from && format(from, fnsFormatStr, { locale: fnsLocale as Locale });
    const toText =
      to && format(to, fnsFormatStr, { locale: fnsLocale as Locale });
    return `${fromText ?? text} - ${toText ?? text}`;
  }

  return text;
};
