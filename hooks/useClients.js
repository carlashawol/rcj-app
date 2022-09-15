import { useCallback } from "react";
import useHttp from "./useHttp";

class ApiResponse {
  data;
  error;
  status;
  statusText;
}

const useClients = () => {
  const http = useHttp();

  const createClient = useCallback(
    async (info) => {
      const apiResponse = new ApiResponse();
      const connection = `${process.env.NEXT_PUBLIC_CONNECT}/api/clients`;

      const response = await http().post(connection, info);

      if (response.error) {
        console.error(
          `Error creating client ${response.status} ${response.error}`,
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

  const getClients = useCallback(async () => {
    const apiResponse = new ApiResponse();
    const connection = `${process.env.NEXT_PUBLIC_CONNECT}/api/clients`;

    const response = await http().get(connection);

    if (response.error) {
      console.error(`Error getting clients ${response.status}`);
      apiResponse.status = response.status;
      apiResponse.error = response.error;
      return apiResponse;
    }
    apiResponse.status = response.status;
    apiResponse.data = response.data;
    return apiResponse;
  }, [http]);

  const getClient = useCallback(
    async (clientName) => {
      const apiResponse = new ApiResponse();
      const connection = `${process.env.NEXT_PUBLIC_CONNECT}/api/clients/${clientName}`;

      const response = await http().get(connection);

      if (response.error) {
        console.error(`Error getting clients ${response.status}`);
        apiResponse.status = response.status;
        apiResponse.error = response.error;
        return apiResponse;
      }
      apiResponse.status = response.status;
      apiResponse.data = response.data;
      return apiResponse;
    },
    [http]
  );

  return {
    createClient,
    getClients,
    getClient
  };
};

export default useClients;
