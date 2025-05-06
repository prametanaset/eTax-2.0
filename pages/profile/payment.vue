<template>
  <BaseProfile>
    <div class="grid md:grid-cols-2 p-5 gap-5">
      <div class="top flex justify-center">
        <div
          class="card w-full max-w-sm aspect-[4/3] h-[12rem] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 shadow-lg text-white relative overflow-hidden"
        >
          <div class="text-sm uppercase tracking-widest">Credit Card</div>
          <div class="mt-6">
            <div class="text-xs">Card Number</div>
            <div class="text-lg font-mono tracking-widest break-words">
              **** **** **** 3456
            </div>
          </div>
          <div class="flex justify-between items-center mt-6 text-xs">
            <div>
              <div class="text-[10px]">Card Holder</div>
              <div class="font-semibold">John Doe</div>
            </div>
            <div>
              <div class="text-[10px]">Expires</div>
              <div class="font-semibold">12/27</div>
            </div>
          </div>
          <!-- Chip -->
          <div
            class="absolute top-4 right-4 w-10 h-7 bg-yellow-300 rounded-sm"
          ></div>
        </div>
      </div>

      <div class="body">
        <h2 class="text-lg mb-4">ผูกบัตรเครดิต</h2>
        <form class="space-y-4">
          <div>
            <Label class="block text-sm font-medium mb-1">Card Number</Label>
            <Input
              type="text"
              placeholder="1234 5678 9012 3456"
              class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <Label class="block text-sm font-medium mb-1"
              >Card Holder Name</Label
            >
            <Input
              type="text"
              placeholder="John Doe"
              class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label class="block text-sm font-medium mb-1">Expiry Date</Label>
              <Input
                type="text"
                placeholder="MM/YY"
                class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <Label class="block text-sm font-medium mb-1">CVV</Label>
              <Input
                type="password"
                placeholder="•••"
                class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
          <Button
            type="button"
            class="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-700 transition"
          >
            บันทึก
          </Button>
        </form>
      </div>
    </div>
  </BaseProfile>
</template>

<script lang="ts" setup>
definePageMeta({
  // layout: "default",
  title: "โปรไฟล์",
});
</script>

<style></style>
