import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31493701-066eddf0638dc5b7781a5a354';

export const getImages = async (query, page, setLoadingStatus, onSearch) => {
  if (query) {
    try {
      setLoadingStatus(true);

      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
      );

      onSearch(response.data.hits, response.data.totalHits);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStatus(false);
    }
  }
};
