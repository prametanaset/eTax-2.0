export default function useFeedBackService() {
  const { apiClient } = useApiClient();

  const submitFeedBack = async (payload: any) => {
    try {
      await apiClient.post("/feedback/submit", payload);
    } catch (error) {
      console.error("❌ Error fetching customers:", error);
      throw error;
    }
  };

  return { submitFeedBack };
}
