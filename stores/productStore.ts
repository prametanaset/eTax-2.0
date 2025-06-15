import type { UUID } from "crypto";
import { defineStore } from "pinia";
import type { Product, ProductPayload } from "~/types/product";
import { ref, computed } from "vue";

import useProductService from "~/composables/useProductService";

export const useProductStore = defineStore("productStore", () => {
  const products = ref<Array<Product>>([]);
  const selectProductList = ref<Product[]>([]);
  const { getProducts, getProductById, deleteProduct } = useProductService();

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

  const setProductIdToDelete = (id: Number) => {
    deleteProduct(id);
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

  // ✅ โหลดสินค้าจาก API และบันทึกลง Store
  const getProductFromId = async (id: Number) => {
    try {
      const response = await getProductById(id);
      return response;
    } catch (error) {
      console.error("❌ Failed to load products:", error);
    }
  };

  return {
    products,
    selectProductList,
    addProduct,
    removeProduct,
    setProducts,
    getProduct,
    clearProductStore,
    setProductIdToDelete,
    getProductFromId,
  };
});
