import { defineStore } from "pinia";
import { ref, computed } from "vue";

import useProductService from "~/composables/useProductService";

export const useProductStore = defineStore("productStore", () => {
  interface Product {
    ID: number;
    StoreId: number;
    ProductCode: string;
    Name: string;
    Price: number;
    Vat: boolean;
    VatRate: number;
  }

  const products = ref<Array<Product>>([]);
  const selectProductList = ref<Product[]>([]);
  const productsToEdit = ref<Array<Product>>([]);
  const productsToDelete = ref<Array<Product>>([]);
  const { getProducts } = useProductService();

  // ✅ Action: เพิ่มสินค้า
  const addProduct = (product: Product) => {
    products.value.push(product);
  };

  // ✅ Action: ลบสินค้า
  const removeProduct = (id: number) => {
    products.value = products.value.filter((product) => product.ID !== id);
  };

  const setProducts = (newProducts: Array<Product>) => {
    products.value = newProducts;
  };

  const setProductToEdit = (newProducts: Array<Product>) => {
    productsToEdit.value = newProducts;
  };

  const setProductToDelete = (newProducts: Array<Product>) => {
    productsToDelete.value = newProducts;
  };

  const setSelectProductList = (newProduct: any) => {
    selectProductList.value = newProduct;
  };

  const clearProductToEdit = () => {
    productsToEdit.value = [];
  };
  const clearProductStore = () => {
    products.value = [];
  };

  // ✅ โหลดสินค้าจาก API และบันทึกลง Store
  const getProduct = async () => {
    try {
      const response = await getProducts();
      products.value = response; // อัปเดต State
    } catch (error) {
      console.error("❌ Failed to load products:", error);
    }
  };

  return {
    products,
    productsToEdit,
    productsToDelete,
    selectProductList,
    addProduct,
    removeProduct,
    setProducts,
    getProduct,
    setProductToEdit,
    clearProductToEdit,
    clearProductStore,
    setProductToDelete,
    setSelectProductList,
  };
});
