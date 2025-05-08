<template>
  <BaseProfile>
    <div class="grid md:grid-cols-2 p-5 gap-5">
      <div class="top flex justify-center">
        <div
          class="card w-full max-w-sm aspect-[4/3] h-[12rem] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 shadow-lg text-white relative overflow-hidden"
        >
          <svg
            class="absolute z-1 top-[-40%] right-[-30%]"
            viewBox="0 0 480 480"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="myGradient"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stop-color="#27286b" />
                <stop offset="100%" stop-color="#a855f7" />
              </linearGradient>
            </defs>
            <path
              fill="url(#myGradient)"
              d="M369.5,308.5Q377,377,308.5,420.5Q240,464,191.5,400.5Q143,337,124,288.5Q105,240,117,184.5Q129,129,184.5,114.5Q240,100,322.5,87.5Q405,75,383.5,157.5Q362,240,369.5,308.5Z"
            />
          </svg>

          <div class="text-sm uppercase tracking-widest">Credit Card</div>
          <div class="relative mt-6 z-10">
            <div class="text-xs">Card Number</div>
            <div class="text-lg tracking-widest break-words">
              **** **** **** 3456
            </div>
          </div>
          <div
            class="relative z-10 flex justify-between items-center mt-6 text-xs"
          >
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
