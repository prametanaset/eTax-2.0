import { z } from "zod";
// Schema สำหรับ Customer
export const customerSchema = z.object({
  ID: z.number(),
  StoreID: z.number(),
  FirstName: z.string(),
  LastName: z.string(),
  Email: z.string().email(),
  Phone: z.string().optional(), // เบอร์โทรเป็นทางเลือก
  Address: z.string(),
  vatNo: z.string(),
});

export type Customer = z.infer<typeof customerSchema>;
