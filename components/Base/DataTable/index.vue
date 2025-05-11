<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { valueUpdater } from "@/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown, Search } from "lucide-vue-next";
import { h, ref } from "vue";
import DropdownAction from "./DataTableDemoColumn.vue";
import { Badge } from "@/components/ui/badge";

export interface Payment {
  id: string;
  amount: number;
  status: 0 | 1 | 2 | 3;
  email: string;
  name: string;
}

const data: Payment[] = [
  {
    id: "INV-0001",
    amount: 316,
    status: 0,
    email: "ken99@yahoo.com",
    name: "กิตติพงศ์ จันทร์ทอง",
  },
  {
    id: "INV-0002",
    amount: 242,
    status: 0,
    email: "Abe45@gmail.com",
    name: "ศราวุฒิ แก้วล้ำ",
  },
  {
    id: "INV-0003",
    amount: 837,
    status: 1,
    email: "Monserrat44@gmail.com",
    name: "มนัสวี ศรีสง่า",
  },
  {
    id: "INV-0004",
    amount: 874,
    status: 0,
    email: "Silas22@gmail.com",
    name: "ธีรภัทร วงศ์ประเสริฐ",
  },
  {
    id: "INV-0005",
    amount: 721,
    status: 2,
    email: "carmella@hotmail.com",
    name: "จารุวรรณ ดำรงธรรม",
  },
];

const columns: ColumnDef<Payment>[] = [
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
        class: "ml-3 mb-2"
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
        class: "ml-3 mb-2"
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "เลขที่ใบแจ้งหนี้",
    cell: ({ row }) => h("div", { class: "font-semibold" }, row.getValue("id")),
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
        () => ["ลูกค้า", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h(
        "div",
        h("div", {}, [
          h("p", { class: "text-sm font-semibold mb-1" }, row.original.name),
          h(
            "p",
            { class: "text-sm text-muted-500 font-thin leading-none" },
            row.getValue("email")
          ),
        ])
      ),
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusClasses;

      const statusClasses = {
        0: "bg-green-50 text-green-700 border-green-100",
        1: "bg-yellow-50 text-yellow-800 border-yellow-100",
        2: "bg-red-50 text-red-700 border-red-100",
        3: "bg-purple-50 text-purple-700 border-purple-100",
      };

      return h("div", { class: "capitalize" }, [
        h(
          Badge,
          { variant: "outline", class: statusClasses[status] || "" },
          () => getStatusLabel(status)
        ),
      ]);
    },
  },
  {
    accessorKey: "amount",
    header: () => h("div", { class: "text-right" }, "จำนวนเงิน"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
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
  switch (status) {
    case 0:
      return "สำเร็จ";
    case 1:
      return "กำลังดำเนินการ";
    case 2:
      return "ยกเลิก";
    case 3:
      return "รอตรวจสอบ";
    default:
      return "ไม่ทราบสถานะ";
  }
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center py-4">
      <div class="relative w-full max-w-sm items-center">
        <Input
          id="search"
          type="text"
          class="max-w-sm font-medium pl-10 bg-[hsl(var(--card))]"
          placeholder="ค้นหาใบกำกับภาษี"
          :model-value="table.getColumn('email')?.getFilterValue() as string"
          @update:model-value="table.getColumn('email')?.setFilterValue($event)"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search class="size-6 text-muted-500/75" />
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="ml-auto mr-2">
            Columns
            <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table
              .getAllColumns()
              .filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="
              (value) => {
                column.toggleVisibility(!!value);
              }
            "
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <NuxtLink to="/invoice/create/invoice">
        <Button class="font-semibold">สร้างใบกำกับภาษี</Button>
      </NuxtLink>
    </div>
    <div class="rounded-md border bg-[hsl(var(--card))]">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="font-noto"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id" class="font-semibold text-sm" >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
                class="font-semibold text-sm"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id" >
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="py-3">
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