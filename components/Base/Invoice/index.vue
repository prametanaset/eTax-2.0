<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const invoice = {
  number: "1069",
  issued: "May 27, 2015",
  due: "June 27, 2015",
  client: {
    name: "Client Name",
    email: "JohnDoe@gmail.com",
    phone: "555-555-5555",
  },
  items: Array.from({ length: 25 }, (_, i) => ({
    desc: `Service ${i + 1}`,
    hours: 2 + (i % 5),
    rate: 75,
  })),
  taxRate: 0.13,
};

const itemsPerPage = 15;

const pages = computed(() => {
  const result = [];
  for (let i = 0; i < invoice.items.length; i += itemsPerPage) {
    result.push(invoice.items.slice(i, i + itemsPerPage));
  }
  return result;
});

const getSubtotal = (items: typeof invoice.items) =>
  items.reduce((sum, i) => sum + i.hours * i.rate, 0);
</script>

<template>
  <div class="bg-muted">
    <div
      v-for="(itemsOnPage, pageIndex) in pages"
      :key="pageIndex"
      class="bg-background shadow-xl w-[794px] h-[1123px] w-full max-w-[794px] mx-auto my-6 px-6 py-4 flex flex-col justify-between page"
    >
      <!-- Header -->
      <div>
        <CardHeader>
          <div class="flex justify-between items-start border-b pb-2">
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

        <!-- Client Info (only on first page) -->
        <div
          v-if="pageIndex === 0"
          class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b py-4"
        >
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
              at elementum enim quam vel purus.
            </p>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto py-4">
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
              <tr v-for="(item, i) in itemsOnPage" :key="i">
                <td class="p-2 border">{{ item.desc }}</td>
                <td class="p-2 border text-center">{{ item.hours }}</td>
                <td class="p-2 border text-center">${{ item.rate }}</td>
                <td class="p-2 border text-right">
                  ${{ (item.hours * item.rate).toFixed(2) }}
                </td>
              </tr>

              <!-- Total & Tax (only on last page) -->
              <template v-if="pageIndex === pages.length - 1">
                <tr>
                  <td class="p-2 border"></td>
                  <td class="p-2 border text-center">Tax</td>
                  <td class="p-2 border text-center">
                    {{ (invoice.taxRate * 100).toFixed(0) }}%
                  </td>
                  <td class="p-2 border text-right">
                    ${{
                      (getSubtotal(invoice.items) * invoice.taxRate).toFixed(2)
                    }}
                  </td>
                </tr>
                <tr class="font-bold bg-muted">
                  <td class="p-2 border" colspan="2"></td>
                  <td class="p-2 border">Total</td>
                  <td class="p-2 border text-right">
                    ${{
                      (
                        getSubtotal(invoice.items) *
                        (1 + invoice.taxRate)
                      ).toFixed(2)
                    }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer (only on last page) -->
      <div
        v-if="pageIndex === pages.length - 1"
        class="flex flex-col md:flex-row justify-between items-start gap-6 pt-6"
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
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  .page {
    page-break-after: always;
    break-after: page;
  }
}
</style>
