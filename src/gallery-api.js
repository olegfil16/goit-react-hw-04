import axios from "axios";

const CLIENT_ID = "2bCBi5euBtlvj89IVXpTML-XjVonacitJlDF5GhSZM0";
axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = `
1Client-ID ${CLIENT_ID}`;
axios.defaults.params = {
  per_page: 12,
};

export const fetchPhotos = async (query, page) => {
  const { data } = await axios.get(`/search/photos`, {
    params: { query, page },
  });

  return data;
};
