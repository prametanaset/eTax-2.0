<script setup lang="ts">
import type {
  ColumnDef,
  SortingState,
  ExpandedState,
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
import {
  ArrowUpDown,
  ChevronDown,
  Search,
  Plus,
  ArrowUpFromLine,
  Clock,
  CircleCheck,
  HelpCircle,
  X,
} from "lucide-vue-next";
import { h, ref, watch } from "vue";
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
  {
    accessorKey: "id",
    header: () => h("div", { class: "ml-5" }, "เลขที่"),
    cell: ({ row }) => h("div", { class: "ml-5 font-suk" }, row.getValue("id")),
  },
  {
    accessorKey: "email",
    header: ({ column }) =>
      h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["ลูกค้า", h(ArrowUpDown, { class: "h-4 w-4" })]
      ),
    cell: ({ row }) =>
      h("div", [
        h("p", { class: "mb-1" }, row.original.name),
        h(
          "p",
          { class: "text-sm text-muted-500 font-normal leading-none" },
          row.getValue("email")
        ),
      ]),
  },
  {
    accessorKey: "documentType",
    header: () => h("div", { class: "text-left ml-5" }, "ประเภทเอกสาร"),
    cell: ({ row }) => {
      const typeLabels: Record<string, string> = {
        invoice: "ใบกำกับภาษี",
        credit_note: "ใบลดหนี้",
        debit_note: "ใบเพิ่มหนี้",
      };
      return h(
        "div",
        { class: "ml-5 text-sm font-medium" },
        typeLabels[row.getValue("documentType")] ?? "ไม่ทราบประเภท"
      );
    },
  },
  {
    accessorKey: "date",
    header: () => h("div", { class: "text-left" }, "วันที่สร้าง"),
    cell: ({ row }) => {
      const formatted = new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(row.getValue("date")));
      return h("div", { class: "text-left" }, formatted);
    },
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => {
      const status = row.getValue("status") as 0 | 1 | 2 | 3;
      const classes = {
        0: "bg-green-50 text-green-700 dark:bg-green-700/20 dark:text-green-300",
        1: "bg-yellow-50 text-yellow-800 dark:bg-yellow-600/20 dark:text-yellow-200",
        2: "bg-red-50 text-red-700 dark:bg-red-700/20 dark:text-red-300",
        3: "bg-purple-50 text-purple-700 dark:bg-purple-700/20 dark:text-purple-300",
      };
      const labels = {
        0: "ส่งแล้ว",
        1: "รอดำเนินการ",
        2: "ยกเลิก",
        3: "รอตรวจสอบ",
      };
      const icons = { 0: CircleCheck, 1: Clock, 2: X, 3: HelpCircle };
      const Icon = icons[status];
      return h(
        Badge,
        { variant: "secondary", class: `${classes[status]} text-sm p-1 px-2` },
        () =>
          h("div", { class: "flex items-center gap-1" }, [
            h(Icon, { class: "w-4 h-4" }),
            labels[status],
          ])
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) =>
      h(DropdownAction, {
        payment: row.original,
        onExpand: row.toggleExpanded,
      }),
  },
];

const sorting = ref<SortingState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const searchTerm = ref("");
const globalFilter = ref("");

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),

  // --- ตัวกรองรวมทุกคอลัมน์ที่ต้องการ ---
  globalFilterFn: (row, _colIds, value) => {
    const q = String(value).toLowerCase();
    return (
      row.original.id.toLowerCase().includes(q) ||
      row.original.name.toLowerCase().includes(q) ||
      row.original.email.toLowerCase().includes(q)
    );
  },
  onGlobalFilterChange: (u) => valueUpdater(u, globalFilter),

  // --- ตัวอัปเดต state อื่น ๆ ---
  onSortingChange: (u) => valueUpdater(u, sorting),
  onColumnVisibilityChange: (u) => valueUpdater(u, columnVisibility),
  onRowSelectionChange: (u) => valueUpdater(u, rowSelection),
  onExpandedChange: (u) => valueUpdater(u, expanded),

  // --- state getter ---
  state: {
    get sorting() {
      return sorting.value;
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
    get globalFilter() {
      return globalFilter.value;
    },
  },
});

// อัปเดต Global Filter ทุกครั้งที่ช่องค้นหาเปลี่ยน
watch(searchTerm, (term) => table.setGlobalFilter(term));

// Export to Excel (เหมือนเดิม)
async function exportPayments() {
  try {
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: "Payments.xlsx",
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Export failed", err);
  }
}
</script>

<template>
  <div class="w-full">
    <div class="flex flex-wrap justify-between items-center gap-4 py-4">
      <!-- ซ้าย: Search / DateRange / Columns -->
      <div class="flex gap-4">
        <!-- ช่องค้นหา -->
        <div class="relative flex w-full max-w-xs">
          <Input
            id="search"
            type="text"
            v-model="searchTerm"
            class="w-full pl-10 bg-[hsl(var(--card))] font-medium placeholder:font-normal"
            placeholder="ค้นหาใบกำกับ / ลูกค้า / อีเมล"
          />
          <span class="absolute inset-y-0 start-0 flex items-center px-3">
            <Search class="size-4 text-muted-foreground" />
          </span>
        </div>

        <BaseDateRangePicker />

        <!-- เลือกคอลัมน์ -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="flex items-center gap-1 bg-[hsl(var(--card))]">
              <span>คอลัมน์</span><ChevronDown class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuCheckboxItem
              v-for="col in table.getAllColumns().filter((c) => c.getCanHide())"
              :key="col.id"
              class="capitalize"
              :model-value="col.getIsVisible()"
              @update:model-value="(val) => col.toggleVisibility(!!val)"
            >
              {{ col.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <!-- ขวา: Export / สร้างใบกำกับ -->
      <div class="flex gap-2">
        <!-- <Button
          variant="outline"
          class="font-medium font-noto px-3 bg-[hsl(var(--card))]"
          @click="exportPayments"
        >
          <ArrowUpFromLine class="-mr-1 w-4 h-4" /> Export
        </Button> -->
        <BaseExportExcelDialog></BaseExportExcelDialog>
        <NuxtLink to="/invoice/create/invoice">
          <Button class="font-medium font-noto px-3 text-white hover:bg-purple-600">
            <Plus class="-mr-1 w-4 h-4" /> สร้างใบกำกับภาษี
          </Button>
        </NuxtLink>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-lg border bg-[hsl(var(--card))] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow
            v-for="hg in table.getHeaderGroups()"
            :key="hg.id"
            class="font-noto"
          >
            <TableHead
              v-for="header in hg.headers"
              :key="header.id"
              class="font-medium dark:bg-[hsl(var(--card))]"
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
          <template v-if="table.getRowModel().rows.length">
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
                  {{ JSON.stringify(row.original, null, 2) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              ไม่มีข้อมูลที่ตรงกัน
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination + Selected -->
    <div class="flex items-center justify-end gap-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground font-semibold">
        {{ table.getFilteredSelectedRowModel().rows.length }} / {{
          table.getFilteredRowModel().rows.length
        }} แถวที่เลือก
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
