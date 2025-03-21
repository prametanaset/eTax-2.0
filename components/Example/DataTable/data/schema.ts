import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export const invoiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  email: z.string(),
  createDate: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export type Invoice = z.infer<typeof invoiceSchema>
