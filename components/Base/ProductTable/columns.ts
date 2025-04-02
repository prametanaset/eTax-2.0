import type { ColumnDef } from "@tanstack/vue-table";
import type { Product } from "./data/schema";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { h } from "vue";
import { labels, priorities, statuses } from "./data/data";
import DataTableColumnHeader from "./ColumnHeader.vue";
import DataTableRowActions from "./RowActions.vue";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        modelValue:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:modelValue": (value) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
        class: "translate-y-0.5",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
        class: "translate-y-0.5",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ProductCode",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "หมายเลขสินค้า" }),
    cell: ({ row }) => h("div", { class: "w-20" }, row.getValue("ProductCode")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Name",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "ชื่อสินค้า" }),

    cell: ({ row }) => {
      return h("div", { class: "flex items-center space-x-4" }, [
        h("div", {}, [
          h(
            "p",
            { class: "text-sm font-medium leading-none" },
            row.getValue("Name")
          ),
        ]),
      ]);
    },
  },
  {
    accessorKey: "Description",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "รายละเอียดสินค้า/บริการ" }),

    cell: ({ row }) => {
      return h("div", { class: "flex items-center space-x-4" }, [
        h("div", {}, [
          h(
            "p",
            { class: "text-sm font-medium leading-none" },
            row.getValue("Description")
          ),
        ]),
      ]);
    },
  },
  {
    accessorKey: "Price",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "ราคา" }),
    cell: ({ row }) => h("div", {}, currencyFormat(row.getValue("Price"))),
  },
  {
    accessorKey: "Vat",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "สถานะ" }),

    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("Vat")
      );

      if (!status) return null;

      return h("div", { class: "flex space-x-2" }, [
        status ? h(Badge, { variant: "outline" }, () => status.label) : null,
      ]);
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "VatRate",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "อัตราภาษี" }),
    cell: ({ row }) => h("div", {}, row.getValue("VatRate") + " %"),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];
