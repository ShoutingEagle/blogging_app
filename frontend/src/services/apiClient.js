// services/apiClient.js
import axios from "axios";
import ClientResponse from "../responses/response.js";

const apiClient = async (axiosConfig) => {
    try {
        const response = await axios(axiosConfig);
        return ClientResponse.success(
            response.data.data,
            response.data?.message || "Request successful",
            response.status
        );
    } catch (error) {
        const resData = error?.response?.data;

        return ClientResponse.error(
            resData?.message || error.message || "Something went wrong",
            error?.response?.status || 500
        );
    }
};

export default apiClient;
