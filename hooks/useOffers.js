import { useCallback } from "react";
import useHttp from "./useHttp";

class ApiResponse {
  data;
  error;
  status;
  statusText;
}

const useOffers = () => {
  const http = useHttp();

  const createOffer = useCallback(
    async (info) => {
      const apiResponse = new ApiResponse();

      const response = await http().post(
        process.env.NEXT_PUBLIC_CONNECT + "/api/offers",
        info
      );

      if (response.error) {
        console.error(
          `Error creating offer ${response.status} ${response.error}`,
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

  const getOffers = useCallback(async () => {
    const apiResponse = new ApiResponse();

    const response = await http().get(process.env.NEXT_PUBLIC_CONNECT + "/api/offers");

    if (response.error) {
      console.error(`Error getting offers ${response.status}`);
      apiResponse.status = response.status;
      apiResponse.error = response.error;
      return apiResponse;
    }
    apiResponse.status = response.status;
    apiResponse.data = response.data;
    return apiResponse;
  }, [http]);

  return {
    createOffer,
    getOffers,
  };
};

export default useOffers;
