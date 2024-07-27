import { Button } from "@/components/Button";
import { DropdownMenu } from "@/components/DropdownMenu";
import {
  DataTableColumnHeaderComponent,
  DataTableColumnHeaderProps,
} from "./types";

export const DataTableColumnHeader: DataTableColumnHeaderComponent = <
  TData,
  TValue,
>({
  column,
  title,
  menuLabel,
  headerProps,
  itemsProps,
  itemsToHide,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const icon =
    column.getIsSorted() === "desc"
      ? "arrow-down"
      : column.getIsSorted() === "asc"
        ? "arrow-up"
        : "arrows-down-up";

  const menus = [];

  !itemsToHide?.includes("asc") &&
    menus.push({
      item: (
        <Button
          className="flex w-full items-center"
          onClick={() => column.toggleSorting(false)}
          icon="arrow-up"
          inverted={true}
          variant={itemsProps?.variant ?? "ghost"}
          {...itemsProps}
        >
          Asc
        </Button>
      ),
    });

  !itemsToHide?.includes("desc") &&
    menus.push({
      item: (
        <Button
          className="flex w-full items-center"
          onClick={() => column.toggleSorting(true)}
          icon="arrow-down"
          inverted={true}
          variant={itemsProps?.variant ?? "ghost"}
          {...itemsProps}
        >
          Desc
        </Button>
      ),
    });

  !itemsToHide?.includes("clear") &&
    menus.push({
      item: (
        <Button
          className="flex w-full items-center"
          onClick={() => column.toggleSorting(undefined)}
          icon="arrows-down-up"
          inverted={true}
          variant={itemsProps?.variant ?? "ghost"}
          {...itemsProps}
        >
          Limpar
        </Button>
      ),
    });

  !itemsToHide?.includes("hide") &&
    menus.push({
      item: "separator",
    }) &&
    menus.push({
      item: (
        <Button
          className="flex w-full items-center"
          onClick={() => column.toggleVisibility(false)}
          icon="eye-slash"
          inverted={true}
          variant={itemsProps?.variant ?? "ghost"}
          {...itemsProps}
        >
          Esconder
        </Button>
      ),
    });

  return (
    <DropdownMenu
      menuLabel={menuLabel}
      trigger={
        <Button
          as="span"
          className="border-0 bg-transparent hover:bg-transparent"
          icon={icon}
          inverted={true}
          {...headerProps}
        >
          {title}
        </Button>
      }
      menus={menus}
    />
  );
};
