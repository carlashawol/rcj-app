import { useCallback } from "react";
import useHttp from "./useHttp";

class ApiResponse {
  data;
  error;
  status;
  statusText;
}

const useInstruments = () => {
  const http = useHttp();

  const createInstrument = useCallback(
    async (info) => {
      const apiResponse = new ApiResponse();

      const response = await http().post(
        "https://rcj-services-app.vercel.app/api/instruments",
        info
      );

      if (response.error) {
        console.error(
          `Error creating instrument ${response.status} ${response.error}`,
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

  const getInstruments = useCallback(async () => {
    const apiResponse = new ApiResponse();

    const response = await http().get("https://rcj-services-app.vercel.app/api/instruments");

    if (response.error) {
      console.error(`Error getting instrument ${response.status}`);
      apiResponse.status = response.status;
      apiResponse.error = response.error;
      return apiResponse;
    }
    apiResponse.status = response.status;
    apiResponse.data = response.data;
    return apiResponse;
  }, [http]);

  return {
    getInstruments,
    createInstrument,
  };
};

export default useInstruments;
