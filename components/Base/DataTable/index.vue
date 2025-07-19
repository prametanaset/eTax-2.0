<template>
  <div class="w-full">
    <!-- แถว 1: Tab Filter + Date Range + ปุ่มออกใบกำกับ -->
<!-- ROW 1: Tabs (no wrap, horizontal scroll on small screens) -->
<div class="overflow-x-auto mb-2">
  <div class="inline-flex whitespace-nowrap">
    <Tabs v-model="activeStatus">
      <TabsList class="inline-flex space-x-2 p-0 bg-transparent">
        <TabsTrigger
          value="all"
          class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-black dark:data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          ทั้งหมด
        </TabsTrigger>
        <TabsTrigger
          value="0"
          class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-black dark:data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          ส่งแล้ว
        </TabsTrigger>
        <TabsTrigger
          value="1"
          class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-black dark:data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          รอดำเนินการ
        </TabsTrigger>
        <TabsTrigger
          value="2"
          class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-black dark:data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          ยกเลิก
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</div>

<!-- ROW 2: Search + Date + Export + Button (stacked on mobile, but minimal vertical padding) -->
<div class="flex flex-col lg:flex-row justify-between items-center gap-2 mb-2">
  <!-- Left: Search + DatePicker -->
  <div class="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
    <div class="relative flex-1 min-w-0 lg:min-w-[200px]">
      <Input
        id="search"
        type="text"
        v-model="searchTerm"
        class="w-full pl-10 rounded-md border  bg-white dark:bg-transparent text-sm placeholder:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent h-9"
        placeholder="ค้นหาเลขที่ / ชื่อ / อีเมล"
      />
      <span class="absolute inset-y-0 left-3 flex items-center">
        <Search class="w-4 h-4 text-muted-foreground " />
      </span>
    </div>
    <div class="w-full sm:w-auto">
      <BaseDateRangePicker class="w-full sm:w-auto h-9" />
    </div>
  </div>

  <!-- Right: Export + Create Invoice -->
  <div class="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
    <div class="w-full sm:w-auto">
      <BaseExportExcelDialog class="w-full sm:w-auto h-9" />
    </div>
    <div class="w-full sm:w-auto">
      <NuxtLink to="/invoice/create/invoice" class="w-full sm:w-auto">
        <Button
          class="w-full sm:w-auto text-sm font-medium px-3 h-9 text-white bg-purple-600 hover:bg-purple-700 rounded-md flex items-center justify-center gap-1"
        >
          <Plus class="w-4 h-4" /> ออกใบกำกับภาษี
        </Button>
      </NuxtLink>
    </div>
  </div>
</div>


    <!-- ----- ตารางแสดงผล ----- -->
    <div class="rounded-lg border bg-[hsl(var(--card))] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow
            v-for="hg in table.getHeaderGroups()"
            :key="hg.id"
            class="font-noto bg-white dark:bg-gray-800"
          >
            <TableHead
              v-for="header in hg.headers"
              :key="header.id"
              class="font-medium "
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
              <TableRow
                :data-state="row.getIsSelected() && 'selected'"
                class="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
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
                <TableCell :colspan="row.getAllCells().length" >
                  <pre class="bg-gray-50 rounded">
                    {{ JSON.stringify(row.original, null, 2) }}
                  </pre>
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

    <!-- ----- Pagination + Selected ----- -->
    <div class="flex items-center justify-end gap-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground font-semibold">
        {{ table.getFilteredSelectedRowModel().rows.length }} /
        {{ table.getFilteredRowModel().rows.length }} แถวที่เลือก
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          ก่อน
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          ถัดไป
        </Button>
      </div>
    </div>
  </div>
</template>

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
  CircleCheck,
  Clock,
  HelpCircle,
  Plus,
  X,
  Search,
} from "lucide-vue-next";
import { h, ref, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
import DropdownAction from "./DataTableDemoColumn.vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    email: "suchintrakuulbuy@thnmphlkrang.or.th",
    name: "ปัตถพงษ์ ตระกูลไม้เรียง",
    date: "2025-05-19T20:42:00",
    documentType: "invoice",
  },
  {
    id: "INV-0002",
    amount: 658,
    status: 0,
    email: "thnmphลkrangrathphngs@gmail.com",
    name: "ธมน ตั้งกุลงาม",
    date: "2025-05-20T03:12:00",
    documentType: "credit_note",
  },
  {
    id: "INV-0003",
    amount: 949,
    status: 1,
    email: "wthnadraksaa@paansuwrrn.in.th",
    name: "มณียา วะคีมัน",
    date: "2025-05-20T02:00:00",
    documentType: "debit_note",
  },
  {
    id: "INV-0002",
    amount: 658,
    status: 0,
    email: "thnmphลkrangrathphngs@gmail.com",
    name: "ธมน ตั้งกุลงาม",
    date: "2025-05-20T03:12:00",
    documentType: "credit_note",
  },
  {
    id: "INV-0003",
    amount: 949,
    status: 1,
    email: "wthnadraksaa@paansuwrrn.in.th",
    name: "มณียา วะคีมัน",
    date: "2025-05-20T02:00:00",
    documentType: "debit_note",
  },
  {
    id: "INV-0002",
    amount: 658,
    status: 0,
    email: "thnmphลkrangrathphngs@gmail.com",
    name: "ธมน ตั้งกุลงาม",
    date: "2025-05-20T03:12:00",
    documentType: "credit_note",
  },
  {
    id: "INV-0003",
    amount: 949,
    status: 1,
    email: "wthnadraksaa@paansuwrrn.in.th",
    name: "มณียา วะคีมัน",
    date: "2025-05-20T02:00:00",
    documentType: "debit_note",
  },
  {
    id: "INV-0002",
    amount: 658,
    status: 0,
    email: "thnmphลkrangrathphngs@gmail.com",
    name: "ธมน ตั้งกุลงาม",
    date: "2025-05-20T03:12:00",
    documentType: "credit_note",
  },
  {
    id: "INV-0003",
    amount: 949,
    status: 1,
    email: "wthnadraksaa@paansuwrrn.in.th",
    name: "มณียา วะคีมัน",
    date: "2025-05-20T02:00:00",
    documentType: "debit_note",
  },
  {
    id: "INV-0002",
    amount: 658,
    status: 0,
    email: "thnmphลkrangrathphngs@gmail.com",
    name: "ธมน ตั้งกุลงาม",
    date: "2025-05-20T03:12:00",
    documentType: "credit_note",
  },
  {
    id: "INV-0003",
    amount: 949,
    status: 1,
    email: "wthnadraksaa@paansuwrrn.in.th",
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
    header: () => h("div", { class: "text-left ml-5" }, "ประเภท"),
    cell: ({ row }) => {
      const typeLabels: Record<string, string> = {
        invoice: "ใบกำกับภาษี",
        credit_note: "ใบลดหนี้",
        debit_note: "ใบเพิ่มหนี้",
      };
      return h(
        "div",
        { class: "ml-5 text-sm font-medium" },
        typeLabels[row.getValue("documentType") as string] ?? "ไม่ทราบประเภท"
      );
    },
    filterFn: "equals",
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
        { variant: "secondary", class: `${classes[status]} text-[14px]` },
        () =>
          h("div", { class: "flex items-center gap-1" }, [
            h(Icon, { class: "w-4 h-4" }),
            labels[status],
          ])
      );
    },
    filterFn: "equals",
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

// Tab Filter สำหรับ “ประเภทเอกสาร”
const activeStatus = ref<string>("all");

const searchTerm = ref("");
const globalFilter = ref("");

const isMobile = useMediaQuery("(max-width: 768px)");
watch(isMobile, (mobile) => {
  if (mobile) {
    columnVisibility.value = {
      email: false,
      documentType: false,
    };
  } else {
    columnVisibility.value = {};
  }
});

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),

  globalFilterFn: (row, _colIds, value) => {
    const q = String(value).toLowerCase();
    return (
      row.original.id.toLowerCase().includes(q) ||
      row.original.name.toLowerCase().includes(q) ||
      row.original.email.toLowerCase().includes(q)
    );
  },
  onGlobalFilterChange: (u) => valueUpdater(u, globalFilter),
  onColumnFiltersChange: (u) => valueUpdater(u, columnVisibility),
  onSortingChange: (u) => valueUpdater(u, sorting),
  onColumnVisibilityChange: (u) => valueUpdater(u, columnVisibility),
  onRowSelectionChange: (u) => valueUpdater(u, rowSelection),
  onExpandedChange: (u) => valueUpdater(u, expanded),

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

// เมื่อเปลี่ยน searchTerm => อัปเดต global filter
watch(searchTerm, (term) => table.setGlobalFilter(term));

// เมื่อเปลี่ยน Tab Filter (ประเภทเอกสาร) => อัปเดต column filter
watch(
  activeStatus,
  (status) => {
    if (status !== "all") {
      // แปลง string เป็น number ก่อนกรอง
      const num = Number(status);
      table.setColumnFilters([{ id: "status", value: num }]);
    } else {
      table.setColumnFilters([]);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.font-noto {
  font-family: "Noto Sans Thai";
}
</style>
