import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "NzptHsFj_wxPcGiwbiaO9y57wa7dxHrH8r3vVXmc8mg";

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        query,
        page,
        per_page: 12,
        client_id: ACCESS_KEY,
      },
    });

    return {
      images: response.data.results,
      total: response.data.total,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    throw new Error("Error fetching images. Please try again.");
  }
};
