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
import { ArrowUpDown, ChevronDown, Search, Plus } from "lucide-vue-next";
import { h, ref } from "vue";
import DropdownAction from "./DataTableDemoColumn.vue";
import { Badge } from "@/components/ui/badge";

export interface Payment {
  id: string;
  amount: number;
  status: 0 | 1 | 2 | 3;
  email: string;
  name: string;
  date: string;
}

const data: Payment[] = [
  {
    id: "INV-0001",
    amount: 321,
    status: 2,
    email: "suchintrakuulbuy@naakhphanthu-thnmphlkrang.or.th",
    name: "ปัตถพงษ์ ตระกูลไม้เรียง",
    date: "2025-05-19T20:42:00",
  },
  {
    id: "INV-0002",
    amount: 658,
    status: 0,
    email: "thnmphlkrangrathphngs@gmail.com",
    name: "ธมน ตั้งกุลงาม",
    date: "2025-05-20T03:12:00",
  },
  {
    id: "INV-0003",
    amount: 949,
    status: 1,
    email: "wthnadraksaa@namthiphy-paansuwrrn.in.th",
    name: "มณียา วะคีมัน",
    date: "2025-05-20T02:00:00",
  },
  {
    id: "INV-0004",
    amount: 417,
    status: 2,
    email: "ephchrmnii17@ymail.com",
    name: "สมนึก นวลฉวี",
    date: "2025-05-18T05:33:00",
  },
  {
    id: "INV-0005",
    amount: 733,
    status: 2,
    email: "sedchwaa@aenwphyaa-tanephaa.com",
    name: "จินต์จุฑา ทวีเดช",
    date: "2025-05-23T22:07:00",
  },
  {
    id: "INV-0006",
    amount: 980,
    status: 2,
    email: "nawamandrthitikul@yahoo.com",
    name: "รังสินี ยะผา",
    date: "2025-05-21T07:04:00",
  },
  {
    id: "INV-0007",
    amount: 482,
    status: 0,
    email: "chaachumkulpriiyaa@muulnithiaehymsiri.com",
    name: "สีหราช ดีตพันธุ์",
    date: "2025-05-18T03:27:00",
  },
  {
    id: "INV-0008",
    amount: 430,
    status: 1,
    email: "kumaarbuycchakrphanth@hcchkelkhaphanthuwiswkaar.co.th",
    name: "เทียมศักดิ์ ดวงทับทิม",
    date: "2025-05-21T19:58:00",
  },
  {
    id: "INV-0009",
    amount: 941,
    status: 0,
    email: "ethasnsuththi@bmcchdiskaprakaay.in.th",
    name: "เอกวิทย์ เตมิยะเดช",
    date: "2025-05-23T15:48:00",
  },
  {
    id: "INV-0010",
    amount: 101,
    status: 0,
    email: "ssiyaa26@thhaaraethkrup.com",
    name: "ณิชาภัทร วิลาสินี",
    date: "2025-05-22T22:50:00",
  },
  {
    id: "INV-0011",
    amount: 135,
    status: 0,
    email: "chaayaesngchayyaanunaay@haanghunswncchamkad.com",
    name: "รอกีเย๊าะ โพธิสัตย์",
    date: "2025-05-18T10:53:00",
  },
  {
    id: "INV-0012",
    amount: 206,
    status: 1,
    email: "piynuchnumkan@yahoo.com",
    name: "เกศรา นามขำ",
    date: "2025-05-22T18:18:00",
  },
  {
    id: "INV-0013",
    amount: 292,
    status: 0,
    email: "aychisthaa28@thumabutraelathngsinthu.co",
    name: "ธนวันต์ ธรรมทินนา",
    date: "2025-05-23T14:22:00",
  },
  {
    id: "INV-0014",
    amount: 881,
    status: 0,
    email: "niymechiiymecchtphinisth@protonmail.com",
    name: "บุญญามี ไทยสุชาต",
    date: "2025-05-20T23:58:00",
  },
  {
    id: "INV-0015",
    amount: 923,
    status: 0,
    email: "cthnadaawuth@hotmail.com",
    name: "เกษรา จันอ้น",
    date: "2025-05-20T09:05:00",
  },
  {
    id: "INV-0016",
    amount: 346,
    status: 1,
    email: "ssiyaanilwrrn@haanghunswncchamkad.in.th",
    name: "เอกชัย นครเทพ",
    date: "2025-05-19T06:10:00",
  },
  {
    id: "INV-0017",
    amount: 466,
    status: 2,
    email: "qophthisaty@brisath.net.th",
    name: "ทับทิม ซูสารอ",
    date: "2025-05-22T23:27:00",
  },
  {
    id: "INV-0018",
    amount: 846,
    status: 1,
    email: "siththayyaphaa@icloud.com",
    name: "ภควัฒน์ อุลหัสสา",
    date: "2025-05-19T12:29:00",
  },
  {
    id: "INV-0019",
    amount: 166,
    status: 1,
    email: "ecchtphinisth36@brisath.in.th",
    name: "กิ่งแก้ว ขอหมั่นกลาง",
    date: "2025-05-19T01:15:00",
  },
  {
    id: "INV-0020",
    amount: 451,
    status: 1,
    email: "siththaydisdain@kon.in.th",
    name: "นราวรรณ ทรงโกมล",
    date: "2025-05-18T13:25:00",
  },
  {
    id: "INV-0021",
    amount: 570,
    status: 0,
    email: "cthrrmsthitaiphsaal@smaakhmaithaichoy.go.th",
    name: "คมสัน ตันเผ่า",
    date: "2025-05-22T00:31:00",
  },
  {
    id: "INV-0022",
    amount: 257,
    status: 2,
    email: "piynuch92@bcchksaastrsilpencchieniiyring.in.th",
    name: "พงษ์นเรศ ตะละภัฏ",
    date: "2025-05-22T22:29:00",
  },
  {
    id: "INV-0023",
    amount: 294,
    status: 0,
    email: "ekrikphl31@brisath.go.th",
    name: "สมหมาย นามขำ",
    date: "2025-05-20T02:12:00",
  },
  {
    id: "INV-0024",
    amount: 433,
    status: 1,
    email: "nirandrthuwanuti@yahoo.com",
    name: "พัชรีนิษฐ์ แท่นทอง",
    date: "2025-05-21T12:37:00",
  },
  {
    id: "INV-0025",
    amount: 730,
    status: 1,
    email: "ynngkhraaythnprathiip@ymail.com",
    name: "กิติวัฒน์ ไทยแท้",
    date: "2025-05-20T13:44:00",
  },
  {
    id: "INV-0026",
    amount: 472,
    status: 0,
    email: "aariiy12@smaakhmophthisaty.in.th",
    name: "ยุลิน ไทนิยม",
    date: "2025-05-19T18:45:00",
  },
  {
    id: "INV-0027",
    amount: 224,
    status: 1,
    email: "hlakthraphy56@naamkhamechrwis.co.th",
    name: "โสภณ พรมอ่อน",
    date: "2025-05-21T04:51:00",
  },
  {
    id: "INV-0028",
    amount: 977,
    status: 2,
    email: "akhrphnth64@kon.in.th",
    name: "ไมล์ ไม้แดง",
    date: "2025-05-18T03:16:00",
  },
  {
    id: "INV-0029",
    amount: 183,
    status: 0,
    email: "rkiieyaaanilsuwrrn@ymail.com",
    name: "อนุวัช ดำริห์ชอบ",
    date: "2025-05-23T01:39:00",
  },
  {
    id: "INV-0030",
    amount: 786,
    status: 1,
    email: "chadchaa11@hcchkngaamphiechsth.or.th",
    name: "ทานตะวัน ถิรสวัสดิ์",
    date: "2025-05-22T13:59:00",
  },
  {
    id: "INV-0031",
    amount: 641,
    status: 0,
    email: "ekhiiywnethiiymsakdi@protonmail.com",
    name: "โอภาส เลิศกิ่ง",
    date: "2025-05-19T02:08:00",
  },
  {
    id: "INV-0032",
    amount: 672,
    status: 2,
    email: "sirnath27@ymail.com",
    name: "ธีร์ธวันาย ศรีเผด็จ",
    date: "2025-05-23T06:05:00",
  },
  {
    id: "INV-0033",
    amount: 509,
    status: 0,
    email: "vetmiyaedch@kon.in.th",
    name: "สุรการณ์ ตะละภัฏ",
    date: "2025-05-18T09:55:00",
  },
  {
    id: "INV-0034",
    amount: 844,
    status: 0,
    email: "nnaakknk@outlook.com",
    name: "หลักทรัพย์ เณรานุสนธิ์",
    date: "2025-05-23T21:32:00",
  },
  {
    id: "INV-0035",
    amount: 859,
    status: 0,
    email: "siththichayaithniym@ymail.com",
    name: "อธิวัตร งามพิเชษฐ์",
    date: "2025-05-23T03:56:00",
  },
  {
    id: "INV-0036",
    amount: 193,
    status: 1,
    email: "helkhaphanthu@brisath.com",
    name: "นราวรรณ นากกนก",
    date: "2025-05-22T03:51:00",
  },
  {
    id: "INV-0037",
    amount: 818,
    status: 1,
    email: "iaethmthn@ymail.com",
    name: "ภัคชัญญา เขียวอ่อน",
    date: "2025-05-23T04:39:00",
  },
  {
    id: "INV-0038",
    amount: 423,
    status: 1,
    email: "cchuthaaratn91@hcchkthumabutr.com",
    name: "เกศรา ถนัดรักษา",
    date: "2025-05-21T18:18:00",
  },
  {
    id: "INV-0039",
    amount: 116,
    status: 2,
    email: "jthiiwr@brisath.com",
    name: "พรชนก ศรทอง",
    date: "2025-05-20T18:49:00",
  },
  {
    id: "INV-0040",
    amount: 975,
    status: 0,
    email: "hrthayhiraysaalii@protonmail.com",
    name: "จันทภา บุญศล",
    date: "2025-05-18T21:50:00",
  },
  {
    id: "INV-0041",
    amount: 435,
    status: 1,
    email: "prayuththchuusaar@brisath.in.th",
    name: "วรปรัชญ์ เมืองสุข",
    date: "2025-05-19T10:31:00",
  },
  {
    id: "INV-0042",
    amount: 931,
    status: 1,
    email: "nuwachphrmn@hcchkthnadrbechrwis.com",
    name: "วีระโชติ พงศ์ฉบับนภา",
    date: "2025-05-21T08:58:00",
  },
  {
    id: "INV-0043",
    amount: 606,
    status: 1,
    email: "thaawrawrnnichaaphathr@outlook.com",
    name: "สิริ ไทไชโย",
    date: "2025-05-22T08:19:00",
  },
  {
    id: "INV-0044",
    amount: 979,
    status: 2,
    email: "rthrrmniym@kon.in.th",
    name: "สิทธัญ ตวันเยี่ยม",
    date: "2025-05-20T22:40:00",
  },
  {
    id: "INV-0045",
    amount: 821,
    status: 2,
    email: "thngsiiaiphlyulin@gmail.com",
    name: "พิมพ์สุดา พงศ์ฉบับนภา",
    date: "2025-05-23T11:47:00",
  },
  {
    id: "INV-0046",
    amount: 156,
    status: 2,
    email: "thiphywaariiecchriyramy@ymail.com",
    name: "สมเกียรติ ศรีวงค์",
    date: "2025-05-21T22:11:00",
  },
  {
    id: "INV-0047",
    amount: 415,
    status: 1,
    email: "nabenuuengnaiml@hcchktraachuuimprtekchprt.com",
    name: "เมษา ชำนาญวาด",
    date: "2025-05-20T17:13:00",
  },
  {
    id: "INV-0048",
    amount: 870,
    status: 0,
    email: "aisykicchnathwrinthr@haanghunswncchamkad.com",
    name: "นัสรุน ติระคมน์",
    date: "2025-05-18T11:52:00",
  },
  {
    id: "INV-0049",
    amount: 356,
    status: 0,
    email: "rkiieyaaa42@protonmail.com",
    name: "พิชาภพ ยางสวย",
    date: "2025-05-23T20:37:00",
  },
  {
    id: "INV-0050",
    amount: 186,
    status: 0,
    email: "thuuphmsrrephchy@brisath.com",
    name: "อาฮามัด พรรษาสกุล",
    date: "2025-05-20T00:51:00",
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
        class: "ml-3 mb-2",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
        class: "ml-3 mb-2",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "เลขที่",
    cell: ({ row }) =>
      h("div", { class: "text-base font-semibold font-suk" }, row.getValue("id")),
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
          h("p", { class: "text-base font-medium mb-1" }, row.original.name),
          h(
            "p",
            { class: "text-sm text-muted-500 font-normal leading-none" },
            row.getValue("email")
          ),
        ])
      ),
  },
  {
    accessorKey: "date",
    header: () => h("div", { class: "text-left" }, "วันที่"),
    cell: ({ row }) => {
      const raw = row.getValue("date");
      const formatted = new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(raw));

      return h("div", { class: "text-left text-base font-medium" }, formatted);
    },
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusClasses;

      const statusClasses = {
  0: "bg-green-50 text-green-700 dark:bg-green-700/20 dark:text-green-300 text-sm font-medium rounded-lg",
  1: "bg-yellow-50 text-yellow-800 dark:bg-yellow-600/20 dark:text-yellow-200 text-sm font-medium rounded-lg",
  2: "bg-red-50 text-red-700 dark:bg-red-700/20 dark:text-red-300 text-sm font-medium rounded-lg",
  3: "bg-purple-50 text-purple-700 dark:bg-purple-700/20 dark:text-purple-300 text-sm font-medium rounded-lg",
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
  switch (status) {
    case 0:
      return "ส่งแล้ว";
    case 1:
      return "รอดำเนินการ";
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
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="text-muted-500/75" />
          </span>
        </div>

        <!-- Date Picker -->
        <BaseDateTimePicker />

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

      <!-- ขวา: ปุ่มสร้าง -->
      <NuxtLink to="/invoice/create/invoice">
        <Button
          class="font-medium font-noto px-3 text-white hover:bg-purple-600 transition rounded-lg"
        >
          <Plus class="-mr-1 w-4 h-4" /> สร้างใบกำกับภาษี
        </Button>
      </NuxtLink>
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
              class="font-medium text-base dark:bg-[hsl(var(--card))]"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
                class="font-medium text-base"
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
