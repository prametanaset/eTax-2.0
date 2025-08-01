<template>
  <div class="space-y-4">
    <DataTableToolbar v-if="screenSize === 'desktop'" :table="table" />
    <div v-else class="flex flex-col gap-5 mt-1">
      <div class="flex gap-2 w-full">
        <div class="relative flex-1 min-w-0 lg:min-w-[200px] w-full">
          <Input
            id="search"
            type="text"
            v-model="searchQuery"
            class="w-full pl-10 rounded-md border bg-white dark:bg-transparent text-sm placeholder:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent h-9"
            placeholder="ค้นหาเลขที่ / ชื่อ / อีเมล"
          />
          <span class="absolute inset-y-0 left-3 flex items-center">
            <Search class="w-4 h-4 text-muted-foreground" />
          </span>
        </div>
        <!-- <ViewOptions /> -->
      </div>
      <div>
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
              รวมภาษี
            </TabsTrigger>
            <TabsTrigger
              value="1"
              class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-black dark:data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              ยังไม่รวมภาษี
            </TabsTrigger>
            <TabsTrigger
              value="2"
              class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-black dark:data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              ไม่รวมภาษี
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>

    <!-- Wrapper ที่ทำให้ตารางเลื่อนแนวนอนได้ในจอเล็ก -->
    <div class="w-full overflow-x-auto rounded-md border bg-[hsl(var(--card))]">
      <!-- ใช้ min-w กับ table เพื่อบังคับความกว้างขั้นต่ำ -->
      <Table v-if="screenSize === 'desktop'" class="min-w-[600px]">
        <TableHeader class="bg-[hsl(var(--card))]">
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="whitespace-nowrap px-4 py-2 text-left"
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
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="whitespace-nowrap px-4 py-2"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center text-sm text-muted-foreground"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class=" overflow-x-hidden" v-else>
        <Tabs v-model="activeStatus">
          <TabsContent
            v-for="tab in ['all', '0', '1','2']"
            :value="tab"
            class="p-0 m-0"
          >
              <Card
                v-for="(product, index) in filteredProducts"
                :key="product.id"
                :value="`item-${product.id}`"
                class="px-2 py-4 m-0 overflow-x-hidden"
              >
                <div>
                  <div class="flex items-center gap-4 w-full relative m-0">
                    <div
                      :class="[
                        'absolute h-[calc(100%+2rem)] w-1 left-[-0.55rem]',
                        product.vat_type === 'include' || product.vat_type === 'exclude'
                          ? 'bg-primary-500'
                          : 'bg-green-500',
                      ]"
                    ></div>
                    <Checkbox :id="`checkbox-${product.id}`" class="ml-2" />

                    <div class="flex items-start overflow-hidden min-w-0 mb-3">
                      <div
                        class="truncate overflow-x-hidden whitespace-nowrap min-w-0"
                      >
                        <span class="text-sm text-muted-foreground mr-5">
                          {{ product.name }}
                        </span>
                        <Badge :class="[product.vat_type === 'include' || product.vat_type === 'exclude'? 'bg-primary-500':'bg-green-500']">{{ product.vat_type === 'exempt'? 'ไม่รวมภาษี' : product.vat_type === 'include'? 'รวมภาษี' :'ยังไม่รวมภาษี' }}</Badge>
                      </div>
                    </div>
                    <p
                      class="absolute left-10 bottom-[-.5rem] flex flex-nonw gap-2 items-center text-[.8rem] font-normal text-muted-foreground truncate text-muted-600 dark:text-muted-400 w-full"
                    >
                      <strong>SKU :</strong>
                      {{ product.sku }}
                      <span
                        ><strong>ราคา :</strong>
                        {{ product.price }} บาท</span
                      >
                    </p>

                    <div class="ml-auto">
                      <RowActions @click.stop :row="product" />
                    </div>
                  </div>
                </div>
        
              </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>

<script lang="ts" setup>
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";

import type { Product } from "./data/schema";
import { valueUpdater } from "@/utils";

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
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import DataTablePagination from "./Pagination.vue";
import DataTableToolbar from "./Toolbar.vue";

interface DataTableProps {
  columns: ColumnDef<Product, any>[];
  data: Product[];
}
const props = defineProps<DataTableProps>();


const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const activeStatus = ref("all");
const searchQuery = ref("");

const isMobile = useMediaQuery("(max-width: 660px)");
const isTablet = useMediaQuery("(max-width: 968px)");
const screenSize = computed(() => {
  if (isMobile.value) return "mobile";
  if (isTablet.value) return "tablet";
  return "desktop";
});

const filteredProducts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();

  // กรองจาก tab ก่อน
  let list = props.data;
  if (activeStatus.value === "0") {
    list = list.filter((c) =>  c.vat_type === "include");
  } else if (activeStatus.value === "1") {
    list = list.filter((c) => c.vat_type === "exclude");
  }
  else if (activeStatus.value === "2") {
    list = list.filter((c) => c.vat_type === "exempt");
  }

  // ถ้ามีข้อความค้นหาให้กรองเพิ่ม
  if (!q) return list;
  

  return list.filter((product) => {
    return (
      product.name.toLowerCase().includes(q) ||
      product.sku.toLowerCase().includes(q) 
    );
  });
});

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
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
  },
  enableRowSelection: true,
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
});
</script>

<style></style>
