import { defineStore } from 'pinia'

export const useSelectCustomerStore = defineStore('selectCustomer', () => {
  const customer = reactive( {
    logo: '',
    title: '',
    email: '',
    url: '',
    address: ''
  });

  function setCustomer(value: string, title: string, email: string, img: string, address: any) {
    customer.logo = value;
    customer.title = title;
    customer.email = email;
    customer.url = img;
    customer.address = address;

  }

  function getCustomer() {
    return customer
  }


  return { setCustomer, getCustomer }
})
