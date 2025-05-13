<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const invoice = {
  number: "1069",
  issued: "May 27, 2015",
  due: "June 27, 2015",
  client: {
    name: "Client Name",
    email: "JohnDoe@gmail.com",
    phone: "555-555-5555",
  },
  items: [
    { desc: "Communication", hours: 5, rate: 75 },
    { desc: "Asset Gathering", hours: 3, rate: 75 },
    { desc: "Design Development", hours: 5, rate: 75 },
    { desc: "Animation", hours: 20, rate: 75 },
    { desc: "Animation Revisions", hours: 10, rate: 75 },
  ],
  taxRate: 0.13,
};

const subtotal = invoice.items.reduce((sum, i) => sum + i.hours * i.rate, 0);
const tax = subtotal * invoice.taxRate;
const total = subtotal + tax;
</script>

<template>
  <div class="w-full bg-muted">
    <Card
      class="aspect-[210/297] w-full max-h-[794px] mx-auto bg-white shadow-xl print:w-[794px] print:h-[1123px]"
    >
      <!-- Header -->
      <CardHeader >
        <div class="flex justify-between items-start border-b">
        <div class="flex gap-4">
          <img
            src="http://michaeltruong.ca/images/logo1.png"
            class="h-16 w-16"
          />
          <div>
            <CardTitle>Michael Truong</CardTitle>
            <p class="text-sm text-muted-foreground">
              hello@michaeltruong.ca<br />
              289-335-6503
            </p>
          </div>
        </div>
        <div class="text-right">
          <h2 class="text-xl font-bold">Invoice #{{ invoice.number }}</h2>
          <p class="text-sm text-muted-foreground">
            Issued: {{ invoice.issued }}<br />
            Due: {{ invoice.due }}
          </p>
        </div>
        </div>
      </CardHeader>

      <!-- Client & Project -->
      <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b py-6">
        <div class="flex gap-4 items-start">
          <img
            src="http://michaeltruong.ca/images/client.jpg"
            class="h-16 w-16 rounded-full"
          />
          <div>
            <h3 class="text-base font-semibold">{{ invoice.client.name }}</h3>
            <p class="text-sm text-muted-foreground">
              {{ invoice.client.email }}<br />
              {{ invoice.client.phone }}
            </p>
          </div>
        </div>
        <div class="text-sm text-muted-foreground">
          <h4 class="font-medium mb-1">Project Description</h4>
          <p>
            Proin cursus, dui non tincidunt elementum, tortor ex feugiat enim,
            at elementum enim quam vel purus. Curabitur semper malesuada urna ut
            suscipit.
          </p>
        </div>
      </CardContent>

      <!-- Table -->
      <CardContent class="overflow-x-auto py-6">
        <table class="w-full text-sm border border-muted rounded-md">
          <thead class="bg-muted">
            <tr>
              <th class="p-2 border">Item Description</th>
              <th class="p-2 border text-center">Hours</th>
              <th class="p-2 border text-center">Rate</th>
              <th class="p-2 border text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoice.items" :key="index">
              <td class="p-2 border">{{ item.desc }}</td>
              <td class="p-2 border text-center">{{ item.hours }}</td>
              <td class="p-2 border text-center">${{ item.rate }}</td>
              <td class="p-2 border text-right">
                ${{ (item.hours * item.rate).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td class="p-2 border"></td>
              <td class="p-2 border text-center">HST</td>
              <td class="p-2 border text-center">
                {{ (invoice.taxRate * 100).toFixed(0) }}%
              </td>
              <td class="p-2 border text-right">${{ tax.toFixed(2) }}</td>
            </tr>
            <tr class="font-bold bg-muted">
              <td class="p-2 border" colspan="2"></td>
              <td class="p-2 border">Total</td>
              <td class="p-2 border text-right">${{ total.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>

      <!-- Footer -->
      <CardContent
        class="flex flex-col md:flex-row justify-between items-start gap-6 pt-6 pb-8"
      >
        <p class="text-xs text-muted-foreground md:w-2/3">
          <strong class="text-foreground">Thank you for your business!</strong
          ><br />
          Payment is expected within 31 days. Late payments will incur 5%
          interest per month.
        </p>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
        >
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="QRZ7QTM9XRPJ6" />
          <button type="submit">
            <img
              src="http://michaeltruong.ca/images/paypal.png"
              class="h-8"
              alt="Pay with PayPal"
            />
          </button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
