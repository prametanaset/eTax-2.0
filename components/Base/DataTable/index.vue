<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { valueUpdater } from "@/utils";


import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown, Search, Plus, ArrowUpFromLine, Clock, CircleCheck, HelpCircle, X } from "lucide-vue-next";
import { h, ref } from "vue";
import DropdownAction from "./DataTableDemoColumn.vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "~/components/ui/button";

export interface Payment {
  id: string;
  amount: number;
  status: 0 | 1 | 2 | 3;
  email: string;
  name: string;
  date: string;
  documentType: "invoice" | "credit_note" | "debit_note";
}

const data: Payment[] = [
  {
    id: "INV-0001",
    amount: 321,
    status: 2,
    email: "suchintrakuulbuy@naakhphanthu-thnmphlkrang.or.th",
    name: "ปัตถพงษ์ ตระกูลไม้เรียง",
    date: "2025-05-19T20:42:00",
    documentType: "invoice",
  },
  {
    id: "INV-0002",
    amount: 658,
    status: 0,
    email: "thnmphlkrangrathphngs@gmail.com",
    name: "ธมน ตั้งกุลงาม",
    date: "2025-05-20T03:12:00",
    documentType: "credit_note",
  },
  {
    id: "INV-0003",
    amount: 949,
    status: 1,
    email: "wthnadraksaa@namthiphy-paansuwrrn.in.th",
    name: "มณียา วะคีมัน",
    date: "2025-05-20T02:00:00",
    documentType: "debit_note",
  },
];


const columns: ColumnDef<Payment>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) =>
  //     h(Checkbox, {
  //       modelValue:
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate"),
  //       "onUpdate:modelValue": (value) =>
  //         table.toggleAllPageRowsSelected(!!value),
  //       ariaLabel: "Select all",
  //       class: "ml-3 mb-2",
  //     }),
  //   cell: ({ row }) =>
  //     h(Checkbox, {
  //       modelValue: row.getIsSelected(),
  //       "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
  //       ariaLabel: "Select row",
  //       class: "ml-3 mb-2",
  //     }),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: () =>
    h(
      "div",
      { class: "ml-5" }, // ← เพิ่ม class ml-3 ที่นี่
      "เลขที่"
    ),
    cell: ({ row }) =>
      h(
        "div",
        { class: "ml-5   font-suk" },
        row.getValue("id")
      ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["ลูกค้า", h(ArrowUpDown, { class: "h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h(
        "div",
        h("div", {}, [
          h("p", { class: "  mb-1" }, row.original.name),
          h(
            "p",
            { class: "text-sm text-muted-500 font-normal leading-none" },
            row.getValue("email")
          ),
        ])
      ),
  },
  {
  accessorKey: "documentType",
  header: () =>
    h("div", { class: "text-left ml-5" }, "ประเภทเอกสาร"),
  cell: ({ row }) => {
    const docType = row.getValue("documentType");

    const typeLabels: Record<string, string> = {
      invoice: "ใบแจ้งหนี้",
      credit_note: "ใบลดหนี้",
      debit_note: "ใบเพิ่มหนี้",
    };

    const badgeClasses: Record<string, string> = {
      invoice: "bg-blue-50 text-blue-700 dark:bg-blue-700/20 dark:text-blue-300",
      credit_note: "bg-emerald-50 text-emerald-700 dark:bg-emerald-700/20 dark:text-emerald-300",
      debit_note: "bg-orange-50 text-orange-700 dark:bg-orange-700/20 dark:text-orange-300",
    };

    return h(
      "div",
      { class: "ml-5" },
      h(
        Badge,
        {
          variant: "secondary",
          class: `${badgeClasses[docType] || ""} text-sm font-medium rounded-lg p-1 px-2`,
        },
        () => typeLabels[docType] || "ไม่ทราบประเภท"
      )
    );
  },
},
  {
    accessorKey: "date",
    header: () => h("div", { class: "text-left" }, "วันที่สร้าง"),
    cell: ({ row }) => {
      const raw = row.getValue("date");
      const formatted = new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(raw));

      return h("div", { class: "text-left  " }, formatted);
    },
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusClasses;

      const statusClasses = {
        0: "bg-green-50 text-green-700 dark:bg-green-700/20 dark:text-green-300 text-sm font-medium rounded-lg p-1 px-2",
        1: "bg-yellow-50 text-yellow-800 dark:bg-yellow-600/20 dark:text-yellow-200 text-sm font-medium rounded-lg p-1 px-2",
        2: "bg-red-50 text-red-700 dark:bg-red-700/20 dark:text-red-300 text-sm font-medium rounded-lg p-1 px-2",
        3: "bg-purple-50 text-purple-700 dark:bg-purple-700/20 dark:text-purple-300 text-sm font-medium rounded-lg p-1 px-2",
      };

      return h("div", { class: "capitalize" }, [
        h(
          Badge,
          { variant: "secondary", class: statusClasses[status] || "" },
          () => getStatusLabel(status)
        ),
      ]);
    },
  },
  // {
  //   accessorKey: "amount",
  //   header: () => h("div", { class: "text-right" }, "จำนวนเงิน"),
  //   cell: ({ row }) => {
  //     const amount = Number.parseFloat(row.getValue("amount"));

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return h("div", { class: "text-right font-medium" }, formatted);
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return h(DropdownAction, {
        payment,
        onExpand: row.toggleExpanded,
      });
    },
  },
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get expanded() {
      return expanded.value;
    },
  },
});

function getStatusLabel(status) {
  const icons = {
    0: CircleCheck,
    1: Clock,
    2: X,
    3: HelpCircle,
  };

  const labels = {
    0: "ส่งแล้ว",
    1: "รอดำเนินการ",
    2: "ยกเลิก",
    3: "รอตรวจสอบ",
  };

  const IconComponent = icons[status];

  return h("div", { class: "flex items-center gap-1" }, [
    h(IconComponent, { class: "w-4 h-4" }),
    labels[status] || "ไม่ทราบสถานะ",
  ]);
}

async function exportPayments() {
  try {
    const res = await fetch('/api/export', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    })
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'Payments.xlsx'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Export failed', err)
  }
}
</script>

<template>
  <div class="w-full">
    <div class="flex flex-wrap justify-between items-center gap-4 py-4">
      <!-- ซ้าย: Search + Date Picker + Columns -->
      <div class="flex gap-4">
        <!-- Search -->
        <div class="relative w-full flex max-w-xs">
          <Input
            id="search"
            type="text"
            class="pl-10 font-medium bg-[hsl(var(--card))] w-full placeholder:font-normal"
            placeholder="ค้นหาลูกค้า"
            :model-value="table.getColumn('email')?.getFilterValue() as string"
            @update:model-value="
              table.getColumn('email')?.setFilterValue($event)
            "
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
          >
            <Search class="size-4 text-muted-foreground" />
          </span>
        </div>

        <!-- Date Picker -->
        <!-- <BaseDateTimePicker /> -->
        
        <BaseDateRangePicker></BaseDateRangePicker>

        <!-- Columns toggle -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              class="flex items-center gap-1 bg-[hsl(var(--card))]"
            >
              <span>คอลัมน์</span>
              <ChevronDown class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuCheckboxItem
              v-for="column in table
                .getAllColumns()
                .filter((col) => col.getCanHide())"
              :key="column.id"
              class="capitalize"
              :model-value="column.getIsVisible()"
              @update:model-value="(value) => column.toggleVisibility(!!value)"
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div class="flex gap-2">
        <Button
        @click="exportPayments"
          variant="outline"
          class="font-medium font-noto px-3 bg-[hsl(var(--card))]  transition rounded-lg"
        >
          <ArrowUpFromLine class="-mr-1 w-4 h-4" /> Export
        </Button>
      <!-- ขวา: ปุ่มสร้าง -->
      <NuxtLink to="/invoice/create/invoice">
        <Button
          class="font-medium font-noto px-3 text-white hover:bg-purple-600 transition rounded-lg"
        >
          <Plus class="-mr-1 w-4 h-4" /> สร้างใบกำกับภาษี
        </Button>
      </NuxtLink>
      </div>
    </div>

    <div class="rounded-lg border bg-[hsl(var(--card))] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="font-noto"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="font-medium   dark:bg-[hsl(var(--card))]"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  class="py-3"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground font-semibold">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-noto {
  font-family: "Noto Sans Thai";
}
</style>
