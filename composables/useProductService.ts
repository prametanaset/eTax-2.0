import useAxios from "@/composables/useAxios";
import type { Customer } from "~/types/customer";

export default function useProducts() {
  const $axios = useAxios(); // ดึง Axios จาก composable

  interface Product {
    ProductCode: string;
    Name: string;
    Description: string;
    Price: number;
    Vat: boolean;
    VatRate: number;
  }

  const getProducts = async () => {
    try {
      const response = await $axios.get("/products");
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      throw error;
    }
  };

  const createProduct = async (product: Product) => {
    try {
      const response = await $axios.post("/products", product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // ✅ ส่งกลับเฉพาะข้อมูลที่สำคัญ
    } catch (error: any) {
      console.error(
        "❌ Error inserting product:",
        error.response?.data || error
      );
      throw new Error(
        error.response?.data?.message || "Failed to create product"
      );
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const response = await $axios.put(`/products/${product.ID}`, product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // ✅ ส่งกลับเฉพาะข้อมูลที่สำคัญ
    } catch (error: any) {
      console.error(
        "❌ Error to update product:",
        error.response?.data || error
      );
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
  };

  const deleteProduct = async (product: Product) => {
    try {
      const response = await $axios.delete(`/products/${product.ID}`);
      return response.data; // ✅ ส่งกลับเฉพาะข้อมูลที่สำคัญ
    } catch (error: any) {
      console.error(
        "❌ Error to delete product:",
        error.response?.data || error
      );
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  };

  return { getProducts, createProduct, updateProduct, deleteProduct };
}
