import { useCallback } from "react";
import useHttp from "./useHttp";

class ApiResponse {
  data;
  error;
  status;
  statusText;
}

const useItemReceptionReport = () => {
  const http = useHttp();

  const createItemReport = useCallback(
    async (info) => {
      const apiResponse = new ApiResponse();

      const response = await http().post(
        process.env.NEXT_PUBLIC_CONNECT + "/api/item_reception",
        info
      );

      if (response.error) {
        console.error(
          `Error creating the item report ${response.status} ${response.error}`,
          response
        );
        apiResponse.status = response.status;
        apiResponse.error = response.error;
        return apiResponse;
      }

      apiResponse.data = response.data;
      return apiResponse;
    },
    [http]
  );

  const getItemReports = useCallback(async () => {
    const apiResponse = new ApiResponse();

    const response = await http().get(process.env.NEXT_PUBLIC_CONNECT + "/api/item_reception");

    if (response.error) {
      console.error(`Error getting item reports ${response.status}`);
      apiResponse.status = response.status;
      apiResponse.error = response.error;
      return apiResponse;
    }
    apiResponse.status = response.status;
    apiResponse.data = response.data;
    return apiResponse;
  }, [http]);

  return {
    createItemReport,
    getItemReports,
  };
};

export default useItemReceptionReport;
