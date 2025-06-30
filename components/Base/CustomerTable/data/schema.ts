import { z } from "zod";
// Schema สำหรับ Customer
export const customerSchema = z.object({
  ID: z.number(),
  StoreID: z.number(),
  CustomerType: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Email: z.string().email(),
  Phone: z.string().optional(), // เบอร์โทรเป็นทางเลือก
  Address: z.string(),
  Tin: z.string(),
});

export type Customer = z.infer<typeof customerSchema>;
