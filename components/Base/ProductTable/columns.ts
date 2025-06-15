import type { ColumnDef } from "@tanstack/vue-table";
// import type { Product } from "./data/schema";
import type { Product } from "@/types/product";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { h } from "vue";
import DataTableColumnHeader from "./ColumnHeader.vue";
import DataTableRowActions from "./RowActions.vue";

// ฟังก์ชันสำหรับ format เงิน
const currencyFormat = (val: number): string =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(val);

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
    accessorKey: "sku",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "รหัสสินค้า" }),
    cell: ({ row }) => h("div", {}, row.getValue("sku")),
  },
  {
    accessorKey: "name",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "ชื่อสินค้า" }),
    cell: ({ row }) =>
      h(
        "p",
        { class: "text-sm font-medium leading-none" },
        row.getValue("name")
      ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "ราคา" }),
    cell: ({ row }) => h("div", {}, currencyFormat(row.getValue("price"))),
  },
  {
    accessorKey: "vat_type",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "ประเภทภาษี" }),
    cell: ({ row }) => {
      const label = ["include", "exclude"].includes(row.getValue("vat_type"))
        ? "รวมภาษี"
        : "ไม่รวมภาษี";
      return h(Badge, { variant: "outline" }, () => label);
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "vat_rate",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "อัตราภาษี (%)" }),
    cell: ({ row }) => h("div", {}, row.getValue("vat_rate") + " %"),
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];
