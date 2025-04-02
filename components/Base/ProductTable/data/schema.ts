import { z } from "zod";
import type { description } from "~/layouts/default.vue";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

export const productSchema = z.object({
  ID: z.string(),
  ProductCode: z.string(),
  Name: z.string(),
  Description: z.string(),
  Price: z.number(),
  Vat: z.boolean(),
  VatRate: z.number(),
});

export type Product = z.infer<typeof productSchema>;
