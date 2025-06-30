export interface Customer {
  ID: number;
  StoreId: string;
  CustomerType: string;
  Tin: string;
  branchCode?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
}
