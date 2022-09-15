import { useCallback } from "react";
import useHttp from "./useHttp";

class ApiResponse {
  data;
  error;
  status;
  statusText;
}

const useCalibrationCerificate = () => {
  const http = useHttp();

  const createCalibrationCerificate = useCallback(
    async (info) => {
      const apiResponse = new ApiResponse();

      const response = await http().post(
        process.env.NEXT_PUBLIC_CONNECT + "/api/calibration_certificate",
        info
      );

      if (response.error) {
        console.error(
          `Error creating calibration certificate ${response.status} ${response.error}`,
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

  const getCalibrationCerificates = useCallback(async () => {
    const apiResponse = new ApiResponse();

    const response = await http().get(process.env.NEXT_PUBLIC_CONNECT + "/api/calibration_certificate");

    if (response.error) {
      console.error(`Error getting calibration certificates ${response.status}`);
      apiResponse.status = response.status;
      apiResponse.error = response.error;
      return apiResponse;
    }
    apiResponse.status = response.status;
    apiResponse.data = response.data;
    return apiResponse;
  }, [http]);

  return {
    createCalibrationCerificate,
    getCalibrationCerificates,
  };
};

export default useCalibrationCerificate;