import { defineStore } from 'pinia'
import { reactive } from 'vue'

import type { InvoiceDocument, InvoiceItem } from '~/types/invoice'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoice = reactive<InvoiceDocument>({
    document_type: '',
    document_number: '',
    reference_id: '',
    store_id: null,
    customer_id: null,
    issue_date: '',
    status: '',
    seller: {
      type: 'company', // 'company' or 'person'
      company: {
        name: '',
        tax_id: '',
        address: '',
      },
      person: {
        first_name: '',
        last_name: '',
        tax_id: '',
        address: '',
      },
    },
    buyer: {
      type: 'company', // 'company' or 'person'
      company: {
        name: '',
        tax_id: '',
        address: '',
      },
      person: {
        first_name: '',
        last_name: '',
        tax_id: '',
        address: '',
      },
    },
    subtotal: 0,
    discount_type: 0,
    discount_value: 0,
    discount_amount: 0,
    vat_amount: 0,
    grand_total: 0,
    remarks: '',
    items: [],
  })

  function setSellerInfo(data: {
    type: 'company' | 'person'
    company?: { name?: string; tax_id?: string; address?: string }
    person?: { first_name?: string; last_name?: string; tax_id?: string; address?: string }
    store_id?: string
  }) {
    invoice.seller.type = data.type
    if (data.company) Object.assign(invoice.seller.company, data.company)
    if (data.person) Object.assign(invoice.seller.person, data.person)
    if (data.store_id) invoice.store_id = data.store_id
  }

  function setBuyerInfo(data: {
    type: 'company' | 'person'
    company?: { name?: string; tax_id?: string; address?: string }
    person?: { first_name?: string; last_name?: string; tax_id?: string; address?: string }
    customer_id?: string
  }) {
    invoice.buyer.type = data.type
    if (data.company) Object.assign(invoice.buyer.company, data.company)
    if (data.person) Object.assign(invoice.buyer.person, data.person)
    if (data.customer_id) invoice.customer_id = data.customer_id
  }

  function calculateLineTotal(product: any): number {
    const price = product.price * product.quantity
    const discount =
      product.discountType === '%'
        ? (price * product.discountValue) / 100
        : product.discountValue ?? 0
    return price - discount
  }

  function addOrUpdateItem(product: InvoiceItem) {
    const existing = invoice.items.find((item) => item.id === product.id)
    if (existing) {
      Object.assign(existing, product)
    } else {
      invoice.items.push(product)
    }
    recalculateTotals()
  }

  function addItem(item: InvoiceItem) {
    invoice.items.push(item)
    recalculateTotals()
  }

  function removeItem(index: number) {
    invoice.items.splice(index, 1)
    recalculateTotals()
  }

  function updateItem(index: number, updatedItem: InvoiceItem) {
    invoice.items[index] = updatedItem
    recalculateTotals()
  }

  function setInvoiceData(data: Partial<InvoiceDocument>) {
    Object.assign(invoice, data)
    recalculateTotals()
  }

  function recalculateTotals() {
    invoice.subtotal = invoice.items.reduce((sum, item) => {
      return sum + calculateLineTotal(item)
    }, 0)

    invoice.discount_amount =
      invoice.discount_type === 1
        ? (invoice.subtotal * invoice.discount_value) / 100
        : invoice.discount_value

    const afterDiscount = invoice.subtotal - invoice.discount_amount
    invoice.vat_amount = afterDiscount * 0.07
    invoice.grand_total = afterDiscount + invoice.vat_amount
  }

  return {
    invoice,
    addItem,
    removeItem,
    updateItem,
    setInvoiceData,
    recalculateTotals,
    calculateLineTotal,
    addOrUpdateItem,
    setSellerInfo,
    setBuyerInfo
  }
})
