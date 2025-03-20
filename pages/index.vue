<template>
  <div>
    <!-- Charts -->
    <div class="grid auto-rows-min gap-4 md:grid-cols-3 mb-5">
      <div class="rounded-xl bg-muted/50">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2 mb-3"
          >
            <CardTitle class="text-md font-medium"> Total Revenue </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-square-kanban"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M8 7v7" />
              <path d="M12 7v4" />
              <path d="M16 7v9" />
            </svg>
          </CardHeader>
          <CardContent class="flex items-center justify-between">
            <div class="flex-none">
              <div class="text-2xl font-bold mb-5">
                <span class="text-primary-500">฿</span> 45,231.89
              </div>
              <p class="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </div>
            <Test class="w-72 h-16" />
          </CardContent>
        </Card>
      </div>

      <!-- 2 -->
      <div class="rounded-xl bg-muted/50">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2 mb-3"
          >
            <CardTitle class="text-md font-medium"> Total Revenue </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-square-kanban"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M8 7v7" />
              <path d="M12 7v4" />
              <path d="M16 7v9" />
            </svg>
          </CardHeader>
          <CardContent class="flex items-center justify-between">
            <div class="flex-none">
              <div class="text-2xl font-bold mb-5">
                <span class="text-primary-500">฿</span> 45,231.89
              </div>
              <p class="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </div>
            <Test class="w-72 h-16" />
          </CardContent>
        </Card>
      </div>

      <!-- 3 -->
      <div class="rounded-xl bg-muted/50">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2 mb-3"
          >
            <CardTitle class="text-md font-medium"> Total Revenue </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-square-kanban"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M8 7v7" />
              <path d="M12 7v4" />
              <path d="M16 7v9" />
            </svg>
          </CardHeader>
          <CardContent class="flex items-center justify-between">
            <div class="flex-none">
              <div class="text-2xl font-bold mb-5">
                <span class="text-primary-500">฿</span> 45,231.89
              </div>
              <p class="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </div>
            <Test class="w-72 h-16" />
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Table -->
    <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <!-- <BaseTable /> -->

      <BaseDataTable />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "รายงานใบกำกับภาษี",
});
</script>

<style></style>