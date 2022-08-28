import { getSession, signIn } from "next-auth/react";
import { useCallback } from "react";

class ApiResponse {
  data;
  error;
  status;
  statusText;
}

const useHttp = () => {
  return useCallback(() => {
    const get = async (url, params) => {

      const requestUrl = params ? `${url}?${params}` : url;

      const apiResponse = new ApiResponse();

      try {
        const resp = await fetch(requestUrl);

        if (!resp.ok) {
          console.error(
            `Error getting data from ${url} ${resp.status} ${resp.text}`,
            resp
          );
          apiResponse.status = resp.status;
          apiResponse.error = "error";
          return apiResponse;
        }

        const jsonResp = await resp.json();

        if (jsonResp.error) {
          console.error(
            `Error getting data from ${url} ${jsonResp.status} ${jsonResp.code}`,
            jsonResp
          );

          apiResponse.status = resp.status;
          apiResponse.error = jsonResp.error;
          return apiResponse;
        }

        apiResponse.status = resp.status;
        apiResponse.data = jsonResp;
        return apiResponse;
      } catch (error) {
        apiResponse.error = error;
        return apiResponse;
      }
    };

    const post = async (url, body) => {
      const apiResponse = new ApiResponse();
      const session = await getSession();

      if (session?.error === "RefreshAccessTokenError") {
        // Force sign in to hopefully resolve error
        await signIn();
      }

      try {
        const resp = await fetch(url, {
          method: "POST",
          headers:
            body instanceof FormData
              ? {}
              : {
                  "Content-Type": "application/json",
                },
          body: body instanceof FormData ? body : JSON.stringify(body),
        });

        if (!resp.ok) {
          console.error(
            `Error1 posting data to ${url} ${resp.status} ${resp.text}`,
            resp
          );
          apiResponse.status = resp.status;
          apiResponse.error = "error";
          return apiResponse;
        }

        const jsonResp = await resp.json();

        if (jsonResp.error) {
          console.error(
            `Error2 posting data to ${url} ${jsonResp.status} ${jsonResp.code}`,
            jsonResp
          );
          apiResponse.status = resp.status;
          apiResponse.error = jsonResp.error;
          return apiResponse;
        }

        apiResponse.status = resp.status;
        apiResponse.data = jsonResp;
        return apiResponse;
      } catch (error) {
        apiResponse.error = error;
        return apiResponse;
      }
    };

    return {
      get,
      post,
    };
  }, []);
};

export default useHttp;
