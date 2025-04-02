export interface Customer {
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
  CreatedAt: string; // หรือ Date ถ้าจะใช้เป็น Date object
  UpdatedAt: string;
}
