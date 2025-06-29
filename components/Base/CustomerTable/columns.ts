import type { ColumnDef } from "@tanstack/vue-table";
import type { Customer } from "./data/schema";

import { h } from "vue";
import DataTableColumnHeader from "./ColumnHeader.vue";
import DataTableRowActions from "./RowActions.vue";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "Tin",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "หมายเลขผู้เสียภาษี" }),
    cell: ({ row }) => h("div", {}, row.getValue("Tin")),
  },
  {
    accessorKey: "FirstName",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "ชื่อ" }),
    cell: ({ row }) => h("div", {}, row.getValue("FirstName")),
  },
  {
    accessorKey: "LastName",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "นามสกุล" }),
    cell: ({ row }) => h("div", {}, row.getValue("LastName")),
  },
  {
    accessorKey: "Email",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "อีเมล" }),
    cell: ({ row }) => h("div", {}, row.getValue("Email")),
  },
  {
    accessorKey: "Phone",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "เบอร์โทรศัพท์" }),
    cell: ({ row }) => h("div", {}, row.getValue("Phone") || "-"), // ถ้าไม่มีเบอร์โทร ให้แสดง "-"
  },
  {
    accessorKey: "Address",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "ที่อยู่" }),
    cell: ({ row }) => h("div", {}, row.getValue("Address")),
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];
