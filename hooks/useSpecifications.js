import { useCallback } from "react";
import useHttp from "./useHttp";

class ApiResponse {
  data;
  error;
  status;
  statusText;
}

const useSpecification = () => {
  const http = useHttp();

  const createSpecification = useCallback(
    async (info) => {
      const apiResponse = new ApiResponse();

      const response = await http().post(
        "https://rcj-services-app.vercel.app/api/specifications",
        info
      );

      if (response.error) {
        console.error(
          `Error creating specification ${response.status} ${response.error}`,
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

  const getSpecifications = useCallback(async () => {
    const apiResponse = new ApiResponse();

    const response = await http().get(
      "https://rcj-services-app.vercel.app/api/specifications"
    );

    if (response.error) {
      console.error(`Error getting specifications ${response.status}`);
      apiResponse.status = response.status;
      apiResponse.error = response.error;
      return apiResponse;
    }
    apiResponse.status = response.status;
    apiResponse.data = response.data;
    return apiResponse;
  }, [http]);

  return {
    createSpecification,
    getSpecifications,
  };
};

export default useSpecification;
