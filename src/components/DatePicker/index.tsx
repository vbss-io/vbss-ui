import { Calendar } from "@/components/Calendar";
import { Popover } from "@/components/Popover";
import { cn } from "@/lib/utils";
import { format, Locale } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ComponentProps, forwardRef, useState } from "react";
import { Button } from "../Button";

type DatePickerProps = ComponentProps<"div"> & {
  variant?: "primary" | "secondary" | "outline";
  selected?: Date;
  onSelect?: (date: unknown) => void;
  buttonProps?: Omit<ComponentProps<typeof Button>, "icon">;
  popoverProps?: Omit<ComponentProps<typeof Popover>, "trigger">;
  calendarProps?: Omit<
    ComponentProps<typeof Calendar>,
    "selected" | "onSelect"
  >;
  label?: string;
  text: string;
  error?: string;
  fnsFormatStr?: string;
  fnsLocale?: Locale;
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
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
          <div className="flex flex-col items-start gap-1">
            {label && (
              <label className={"pl-0.5 font-medium text-sm"}>{label}</label>
            )}
            <Button
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
  }
);
