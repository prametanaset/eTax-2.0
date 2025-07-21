
  export interface InvoiceItem {
    id: number
    document_id: number
    product_id?: number | null
    product_name: string
    sku: string
    qty: number
    unit_price: number
    discount: number
    vat_type: string
    vat_rate: number
    line_total: number
  }




export interface InvoiceDocument {
  document_type: string
  document_number: string
  reference_id: string
  store_id: string | null
  customer_id: string | null
  issue_date: string
  status: string

  seller: {
    type: 'company' | 'person'
    company: {
      name: string
      tax_id: string
      address: string
    }
    person: {
      first_name: string
      last_name: string
      tax_id: string
      address: string
    }
  }

  buyer: {
    type: 'company' | 'person'
    company: {
      name: string
      tax_id: string
      address: string
    }
    person: {
      first_name: string
      last_name: string
      tax_id: string
      address: string
    }
  }

  subtotal: number
  discount_type: number
  discount_value: number
  discount_amount: number
  vat_amount: number
  grand_total: number
  remarks: string

  items: InvoiceItem[]
}

