import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "~/types/product";
import useProductService from "~/composables/useProductService";

export const useProductStore = defineStore("productStore", () => {
  const products = ref<Product[]>([]);
  const selectProductList = ref<Product[]>([]);
  const { getProducts, getProductById, deleteProduct } = useProductService();

  const addProduct = (product: Product) => {
    products.value.push(product);
  };

  const removeProduct = (id: number) => {
    products.value = products.value.filter((product) => product.ID !== id);
  };

  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts;
  };

  const setSelectProductList = (productList: Product[]) => {
    selectProductList.value = productList;
  };

  const setProductIdToDelete = (id: Number) => {
    deleteProduct(id);
  };

  const clearProductStore = () => {
    products.value = [];
    selectProductList.value = [];
  };

  const getProduct = async () => {
    try {
      const response = await getProducts();
      products.value = response;
    } catch (error) {
      console.error("❌ Failed to load products:", error);
    }
  };

  const getProductFromId = async (id: Number) => {
    try {
      const response = await getProductById(id);
      return response;
    } catch (error) {
      console.error("❌ Failed to load products:", error);
    }
  };

  // ✅ คำนวณยอดรวม
  const subtotal = computed(() => {
    return selectProductList.value.reduce((sum, product: any) => {
      return sum + product.price * product.quantity;
    }, 0);
  });

  const totalTax = computed(() => {
    return selectProductList.value.reduce((sum, product: any) => {
      const price = product.price * product.quantity;
      const discount =
        product.discountType === "%"
          ? (price * product.discountValue) / 100
          : product.discountValue;

      const taxableAmount = price - discount;
      if (product.taxType === "include") {
        return sum + (taxableAmount * 7) / 107;
      } else if (product.taxType === "exclude") {
        return sum + (taxableAmount * 7) / 100;
      }
      return sum;
    }, 0);
  });

  const total = computed(() => {
    return subtotal.value + totalTax.value;
  });

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
    setSelectProductList,
    subtotal,
    totalTax,
    total,
  };
});
