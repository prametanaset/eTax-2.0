export interface Product {
  ID: number;
  StoreId: string;
  Sku: string;
  Name: string;
  Price: number;
  VatType: string;
  VatRate: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}

// ใช้เมื่อส่งไปหลังบ้านตอน create
export interface ProductPayload {
  product: {
    id: Number;
    store_id: string;
    sku: string;
    name: string;
    price: number;
    vat_type: string;
    vat_rate: number;
  };
  product_image: {
    url: string;
  }[];
}
