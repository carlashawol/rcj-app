import { useCallback } from "react";
import useHttp from "./useHttp";

class ApiResponse {
  data;
  error;
  status;
  statusText;
}

const useActivity = () => {
  const http = useHttp();

  const getActivities = useCallback(async () => {
    const apiResponse = new ApiResponse();
    const connection = `${process.env.NEXT_PUBLIC_CONNECT}/api/activities`;

    const response = await http().get(connection);

    if (response.error) {
      console.error(`Error getting activities ${response.status}`);
      apiResponse.status = response.status;
      apiResponse.error = response.error;
      return apiResponse;
    }
    apiResponse.status = response.status;
    apiResponse.data = response.data;
    return apiResponse;
  }, [http]);


  return {
    getActivities,
  };
};

export default useActivity;
