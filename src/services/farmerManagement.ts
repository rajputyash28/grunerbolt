import axios from "axios";

// Defines the expected structure for a single farmer object.
export interface Farmer {
  id: string;
  name: string;
  phoneNumber: string;
  memberId: string;
  isActive: boolean;
  createdAt: string;
  totalLands: number;
  totalLandAreaAcres: number;
}

// Defines the structure of the API response for farmers.
export interface FarmerListResponse {
  statusCode: number;
  message: string;
  data: {
    farmers: Farmer[];
    count: number;
    page: number;
    limit: number;
    totalPages: number;
    nextPage: number;
  };
}

// Defines the parameters for fetching farmers.
export interface FetchFarmersParams {
  search?: string; // Updated to match spec's "search" parameter
  isActive?: boolean;
  stateId?: string;
  districtId?: string;
  mandalId?: string;
  totalLandMin?: number;
  totalLandMax?: number;
  page?: number; // Made optional to align with spec
  limit?: number; // Made optional to align with spec
  newestFirst?: boolean;
}

// Creates a pre-configured Axios instance for the farmer management API.
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/fm", // Updated to match spec's "/fm" endpoint
  headers: { "Content-Type": "application/json" },
});

export const farmerService = {
  /**
   * Fetches a paginated and searchable list of farmers from the API.
   * @param params - An object containing all query parameters.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchFarmers: async (params: FetchFarmersParams, token: string) => {
    try {
      const response = await api.get<FarmerListResponse>("/", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: params.search,
          isActive: params.isActive,
          stateId: params.stateId,
          districtId: params.districtId,
          mandalId: params.mandalId,
          page: params.page ?? 1, // Default to 1 per spec
          limit: params.limit ?? 10, // Default to 10 per spec
          newestFirst: params.newestFirst ?? true, // Default to true per spec
          totalLandMin: params.totalLandMin,
          totalLandMax: params.totalLandMax,
        },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching farmers:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch farmers. Please try again.",
      };
    }
  },

  /**
   * Deletes a farmer record from the API.
   * @param farmerId - The ID of the farmer to delete.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  deleteFarmer: async (farmerId: string, token: string) => {
    try {
      await api.delete(`/${farmerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting farmer:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete farmer.",
      };
    }
  },

  /**
   * Toggles the active status of a farmer (block/unblock).
   * @param farmerId - The ID of the farmer to update.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  toggleFarmerStatus: async (farmerId: string, token: string) => {
    try {
      await api.put(`/${farmerId}/status`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    } catch (error: any) {
      console.error("Error toggling farmer status:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to toggle farmer status.",
      };
    }
  },
};

//handles with status code 

// import axios from "axios";

// // Defines the expected structure for a single farmer object.
// export interface Farmer {
//   id: string;
//   name: string;
//   phoneNumber: string;
//   memberId: string;
//   isActive: boolean;
//   createdAt: string;
// }

// // Defines the structure of the data part of the API response for listing farmers.
// export interface FarmerListResponse {
//   data: {
//     farmers: Farmer[];
//     count: number;
//     totalPages: number;
//     page: number;
//     limit: number;
//     nextPage: number;
//   };
// }

// // Defines the structure of the API response for toggle status and delete operations.
// export interface FarmerActionResponse {
//   data: {
//     id: string;
//     isActive?: boolean; // For toggle status
//     deleted?: boolean; // For delete
//   };
//   message: string; // API-provided success message
// }

// // Creates a pre-configured Axios instance for the farmer management API.
// const api = axios.create({
//   baseURL: "http://172.50.5.102:3000/api/v1/farmer-management",
//   headers: { "Content-Type": "application/json" },
// });

// // Maps HTTP status codes to fallback error messages when API message is absent.
// const getErrorMessage = (status: number, apiMessage?: string): string => {
//   if (apiMessage) return apiMessage; // Prioritize API message
//   switch (status) {
//     case 400:
//       return "Bad request: Invalid parameters provided.";
//     case 401:
//       return "Unauthorized: Invalid or missing authentication token.";
//     case 404:
//       return "Not found: The requested farmer does not exist.";
//     default:
//       return "An unexpected error occurred.";
//   }
// };

// export const farmerService = {
//   /**
//    * Fetches a paginated and searchable list of farmers from the API.
//    * @param searchTerm - The search query string.
//    * @param currentPage - The current page number to fetch.
//    * @param limit - The number of items per page.
//    * @param token - The authentication token.
//    * @returns An object with success status, data (on success), or an error message.
//    */
//   fetchFarmers: async (searchTerm: string, currentPage: number, limit: number, token: string) => {
//     try {
//       const response = await api.get<FarmerListResponse>("/", {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           search: searchTerm,
//           page: currentPage,
//           limit: limit,
//           newestFirst: true,
//         },
//       });

//       if (response.status === 200) {
//         return { success: true, data: response.data.data, message: response.data.message };
//       }
//       return {
//         success: false,
//         message: response.data.message || `Unexpected status code: ${response.status}`,
//       };
//     } catch (error: any) {
//       console.error("Error fetching farmers:", error);
//       const status = error.response?.status;
//       const apiMessage = error.response?.data?.message;
//       return {
//         success: false,
//         message: getErrorMessage(status, apiMessage),
//       };
//     }
//   },

//   /**
//    * Deletes a farmer record from the API.
//    * @param farmerId - The ID of the farmer to delete.
//    * @param token - The authentication token.
//    * @returns An object with success status, data (on success), or an error message.
//    */
//   deleteFarmer: async (farmerId: string, token: string) => {
//     try {
//       const response = await api.delete<FarmerActionResponse>(`/${farmerId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200) {
//         return { success: true, data: response.data.data, message: response.data.message };
//       }
//       return {
//         success: false,
//         message: response.data.message || `Unexpected status code: ${response.status}`,
//       };
//     } catch (error: any) {
//       console.error("Error deleting farmer:", error);
//       const status = error.response?.status;
//       const apiMessage = error.response?.data?.message;
//       return {
//         success: false,
//         message: getErrorMessage(status, apiMessage),
//       };
//     }
//   },

//   /**
//    * Toggles the active status of a farmer (block/unblock).
//    * @param farmerId - The ID of the farmer to update.
//    * @param token - The authentication token.
//    * @returns An object with success status, data (on success), or an error message.
//    */
//   toggleFarmerStatus: async (farmerId: string, token: string) => {
//     try {
//       const response = await api.put<FarmerActionResponse>(`/${farmerId}/status`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200) {
//         return { success: true, data: response.data.data, message: response.data.message };
//       }
//       return {
//         success: false,
//         message: response.data.message || `Unexpected status code: ${response.status}`,
//       };
//     } catch (error: any) {
//       console.error("Error toggling farmer status:", error);
//       const status = error.response?.status;
//       const apiMessage = error.response?.data?.message;
//       return {
//         success: false,
//         message: getErrorMessage(status, apiMessage),
//       };
//     }
//   },
// };