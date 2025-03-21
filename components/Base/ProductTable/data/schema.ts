import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  vat: z.boolean(),
  vatRate: z.number(),
})



export type Product = z.infer<typeof productSchema>

