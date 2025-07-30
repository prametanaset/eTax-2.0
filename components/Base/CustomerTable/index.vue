<template>
  <div class="space-y-4">
    <DataTableToolbar v-if="screenSize === 'desktop'" :table="table" />

    <div v-else class="flex flex-col gap-5 mt-1">
      <div class="flex gap-2 w-full">
        <div class="relative flex-1 min-w-0 lg:min-w-[200px]">
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
        <ViewOptions />
      </div>
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
            บุคคลธรรมดา
          </TabsTrigger>
          <TabsTrigger
            value="1"
            class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-black dark:data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            นิติบุคคล
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <div class="rounded-md border bg-[hsl(var(--card))]">
      <!-- hsl(var(--card)); -->
      <Table v-if="screenSize === 'desktop'" class="">
        <TableHeader class="bg-[hsl(var(--card))]">
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
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
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div class="w-[calc(100dvw-2rem)] overflow-x-hidden" v-else>
        <Tabs v-model="activeStatus">
          <TabsContent
            v-for="tab in ['all', '0', '1']"
            :value="tab"
            class="p-0 m-0"
          >
            <Accordion type="single" collapsible class="p-0 m-0">
              <AccordionItem
                v-for="customer in filteredCustomers"
                :key="customer.id"
                :value="`item-${customer.id}`"
                class="px-2 m-0 overflow-x-hidden"
              >
                <AccordionTrigger>
                  <div class="flex items-center gap-4 w-full relative m-0">
                    <div
                      :class="[
                        'absolute h-[calc(100%+2rem)] w-1 left-[-0.55rem]',
                        customer.customer_type === 'person'
                          ? 'bg-primary-500'
                          : 'bg-green-500',
                      ]"
                    ></div>
                    <Checkbox :id="`checkbox-${customer.id}`" class="ml-2" />

                    <div class="flex items-start overflow-hidden min-w-0 mb-3">
                      <div
                        class="truncate overflow-x-hidden whitespace-nowrap min-w-0"
                      >
                        <span class="text-sm font-medium mr-5">
                          {{ getCustomerDisplayTin(customer) }}
                        </span>
                        <span class="text-sm text-muted-foreground">
                          {{ getCustomerDisplayName(customer) }}
                        </span>
                      </div>
                    </div>
                    <p
                      class="absolute left-10 bottom-[-.5rem] flex flex-nonw gap-2 items-center text-[.8rem] font-normal text-muted-foreground truncate text-muted-600 dark:text-muted-400 w-full"
                    >
                      <Mail :size="15" />
                      {{ getCustomerDisplayGmail(customer) }}
                    </p>

                    <div class="ml-auto">
                      <RowActions :row="customer" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    class="flex flex-col gap-2 text-sm text-muted-foreground ml-10"
                  >
                    <div class="">
                      <Badge
                        :class="[
                          customer.customer_type === 'person'
                            ? 'bg-primary-500'
                            : 'bg-green-500',
                        ]"
                        >{{
                          customer.customer_type === "person"
                            ? "บุคคลธรรมดา"
                            : "นิติบุคคล"
                        }}</Badge
                      >
                    </div>
                    <p>
                      ที่อยู่ :
                      <span class="text-muted-600 dark:text-muted-400"
                        >{{ customer.customer_address?.address_line1 || "-" }}
                        {{ locationLabels[customer.id] || "..." }}</span
                      >
                    </p>
                    <p>
                      เบอร์ติดต่อ :
                      <span class="text-muted-600 dark:text-muted-400">{{
                        customer.customer_contacts[1].contact_value || "-"
                      }}</span>
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

import type { Customer } from "./data/schema";
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
import RowActions from "./RowActions.vue";
import { LocateIcon, Mail, Search } from "lucide-vue-next";
import ViewOptions from "./ViewOptions.vue";

interface DataTableProps {
  columns: ColumnDef<Customer, any>[];
  data: Customer[];
}
const props = defineProps<DataTableProps>();
const customerStore = useCustomerStore();
const { createCustomerService, updateCustomerService, deleteCustomerService } =
  useCustomerService();

const { getDistrictById, getSubdistrictById, getProvinceById } =
  useLocateService();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const activeStatus = ref("all");
const isDialogOpen = ref(false);
const searchQuery = ref("");
const locationLabels = ref<Record<number, string>>({});

const isMobile = useMediaQuery("(max-width: 660px)");
const isTablet = useMediaQuery("(max-width: 968px)");

const screenSize = computed(() => {
  if (isMobile.value) return "mobile";
  if (isTablet.value) return "tablet";
  return "desktop";
});

function getCustomerDisplayName(customer: any) {
  if (customer.customer_type === "person") {
    return `${customer.person_customer.first_name} ${customer.person_customer.last_name}`;
  }
  if (customer.customer_type === "company") {
    return customer.company_customer.company_name;
  }
  return "Unknown Customer";
}
function getCustomerDisplayTin(customer: any) {
  if (customer.customer_type === "person") {
    return `${customer.person_customer.tin}`;
  }
  if (customer.customer_type === "company") {
    return `${customer.company_customer.tin} ${customer.company_customer.branch_no}`;
  }
  return "Unknown Customer";
}

function getCustomerDisplayGmail(customer: any) {
  const email =
    customer.customer_contacts?.find((c) => c.contact_type === "email")
      ?.contact_value || "-";

  return email;
}

async function fetchLocationLabel(customer: any) {
  const location = customer.customer_address;
  if (!location) {
    locationLabels.value[customer.id] = "-";
    return;
  }

  try {
    const [province, district, subDistrict] = await Promise.all([
      getProvinceById(location.province_id),
      getDistrictById(location.districts_id),
      getSubdistrictById(location.subdistricts_id),
    ]);

    if (province && district && subDistrict) {
      locationLabels.value[
        customer.id
      ] = `${province.Label} ${district.Label} ${subDistrict.name_th} ${subDistrict.zip_code}`;
    } else {
      locationLabels.value[customer.id] = "เกิดข้อผิดพลาด";
    }
  } catch (e) {
    locationLabels.value[customer.id] = "เกิดข้อผิดพลาด";
  }
}

const filteredCustomers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();

  // กรองจาก tab ก่อน
  let list = customerStore.customerList;
  if (activeStatus.value === "0") {
    list = list.filter((c) => c.customer_type === "person");
  } else if (activeStatus.value === "1") {
    list = list.filter((c) => c.customer_type === "company");
  }

  // ถ้ามีข้อความค้นหาให้กรองเพิ่ม
  if (!q) return list;

  return list.filter((customer) => {
    return (
      getCustomerDisplayTin(customer).toLowerCase().includes(q) ||
      getCustomerDisplayName(customer).toLowerCase().includes(q) ||
      getCustomerDisplayGmail(customer).toLowerCase().includes(q)
    );
  });
});

watch(
  () => customerStore.customerList,
  (customers) => {
    customers.forEach((customer) => {
      if (!locationLabels.value[customer.id]) {
        fetchLocationLabel(customer);
      }
    });
  },
  { immediate: true }
);

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
