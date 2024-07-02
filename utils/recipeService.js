import axios from 'axios';

const fetchRecipesFromEdamam = async (classes) => {
  const appId = 'c16fb94a';
  const appKey = '12d51a7d52eb0848281f09c84de1bc11';

  const baseUrl = `https://api.edamam.com/search`;
  const query = classes.join('+'); 
  console.log('query', query)
  try {
    const response = await axios.get(baseUrl, {
      params: {
        q: query,
        app_id: appId,
        app_key: appKey,
      },
    });
    console.log('response.data', response.data.hits)
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching recipes from Edamam:', error);
    throw error;
  }
};

export { fetchRecipesFromEdamam };