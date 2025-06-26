import useAxios from "@/composables/useAxios";
import type { ProductPayload, Product } from "~/types/product";

export default function useProducts() {
  const { apiClient } = useApiClient();

  const storeId = "a3f2b4e1-8f17-4f55-b6c0-1b758e2f34cd";

  const getProducts = async () => {
    try {
      const response = await apiClient.get("/products", {
        params: { store_id: storeId },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      throw error;
    }
  };

  const getProductById = async (id: Number) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      throw error;
    }
  };

  const createProduct = async (product: any) => {
    try {
      const payload = {
        product: {
          store_id: storeId,
          name: product.name,
          price: product.price,
          vat_type: product.taxType,
        },
        product_image: [
          {
            url: product.image,
          },
        ],
      };
      const response = await apiClient.post("/products", payload, {
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

  const updateProduct = async (product: any) => {
    try {
      const payload = {
        product: {
          id: product.id,
          sku: product.sku,
          store_id: storeId,
          name: product.name,
          price: product.price,
          vat_type: product.taxType,
        },
        product_image: [
          {
            url: product.image,
          },
        ],
      };
      const response = await apiClient.put(`/products/`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        params: { id: product.id },
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

  const deleteProduct = async (id: Number) => {
    try {
      const response = await apiClient.delete(`/products/${id}`);
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

  return {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
