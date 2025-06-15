import { z } from "zod";
import type { description } from "~/layouts/default.vue";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

export const productSchema = z.object({
  id: z.number(), // uint
  sku: z.string(), // Sku
  name: z.string(), // Name
  price: z.number(), // float64
  vat_type: z.string(), // included / excluded
  vat_rate: z.number(), // int
});

export type Product = z.infer<typeof productSchema>;
