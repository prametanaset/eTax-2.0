import type { ColumnDef } from "@tanstack/vue-table";
import type { Task, Invoice } from "./data/schema";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { h } from "vue";
import { labels, priorities, statuses } from "./data/data";
import DataTableColumnHeader from "./ColumnHeader.vue";
import DataTableRowActions from "./RowActions.vue";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const columns: ColumnDef<Invoice>[] = [
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
    accessorKey: "id",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "หมายเลขใบกำกับภาษี" }),
    cell: ({ row }) => h("div", { class: "w-20" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "ลูกค้า" }),

    cell: ({ row }) => {
      return h("div", { class: "flex items-center space-x-4" }, [
        h(Avatar, {}, () => [
          h(AvatarImage, { src: "/avatars/rick.png" }),
          h(AvatarFallback, {}, () => {
            // ใช้ชื่อย่อจากชื่อลูกค้า เช่น "TS"
            const name = row.getValue("name") || "";
            const initials = name
              .split(" ")
              .map((word: string) => word[0])
              .join("")
              .slice(0, 2);
            return initials.toUpperCase();
          }),
        ]),
        h("div", {}, [
          h(
            "p",
            { class: "text-sm font-medium leading-none" },
            row.getValue("name")
          ),
          h(
            "p",
            { class: "text-sm text-muted-400" },
            row.original.email
          ),
        ]),
      ]);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "สถานะ" }),

    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) return null;

      return h('div', { class: 'flex space-x-4' }, [
        status ? h(Badge, { variant: 'outline' }, () => status.label) : null,
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) =>
  //     h(DataTableColumnHeader, { column, title: "วันที่สร้าง" }),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     );

  //     if (!priority) return null;

  //     return h("div", { class: "flex items-center" }, [
  //       priority.icon &&
  //         h(priority.icon, { class: "mr-2 h-4 w-4 text-muted-foreground" }),
  //       h("span", {}, priority.label),
  //     ]);
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "createDate",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "วันที่สร้าง" }),
    cell: ({ row }) => h("div", {}, row.getValue("createDate")),
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];
