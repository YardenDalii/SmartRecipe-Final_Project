import axios from 'axios';


const appId = 'c16fb94a';
const appKey = '12d51a7d52eb0848281f09c84de1bc11';
const baseUrl = `https://api.edamam.com/search`;
const filters = {"diet": ["none","balanced", "high-fiber", "high-protein", "low-carb", "low-fat", "low-sodium"],
  "health": ["none","alcohol-cocktail","alcohol-free","celery-free","crustacean-free","dairy-free","DASH","egg-free","fish-free","fodmap-free","gluten-free",
"immuno-supportive","keto-friendly","kidney-friendly","kosher","low-fat-abs","low-potassium","low-sugar","lupine-free","Mediterranean",
"mollusk-free","mustard-free","no-oil-added","paleo","peanut-free","pescatarian","pork-free","red-meat-free","sesame-free",
"shellfish-free","soy-free","sugar-conscious","sulfite-free","tree-nut-free","vegan","vegetarian","wheat-free"],
   "cuisine type":  ["none","American","Asian","British","Caribbean","Central Europe","Chinese","Eastern Europe","French","Indian",
  "Italian","Japanese","Kosher","Mediterranean","Mexican","Middle Eastern","Nordic","South American","South East Asian"],
  "meal type": ["none","Breakfast", "Dinner","Lunch","Snack","Teatime"],
  "dish type": ["none","Biscuits and cookies","Bread","Cereals","Condiments and sauces","Desserts","Drinks","Main course","Pancake","Preps","Preserve",
    "Salad","Sandwiches","Side dish","Soup","Starter","Sweets"]           
}

const fetchRecipesFromEdamam = async (classes = [], recName = "", option, selectedFilters = {}) => {
  let query = '';
  let params = {
    app_id: appId,
    app_key: appKey
  };

  try {
    if (option === 1) {
      query = classes.join('+');
      console.log('query', query);
    } else if (option === 2) {
      query = recName;
    }

    params.q = query;
    console.log("param", params);

    Object.keys(selectedFilters).forEach(filterCategory => {
      if (selectedFilters[filterCategory] !== 'none') {
        params[filterCategory.replace(' ', '_')] = selectedFilters[filterCategory];
      }
    });

    const response = await axios.get(baseUrl, { params });
    console.log('response.data', response.data.hits);
    return response.data.hits;
  } catch (error) {
    Alert.alert(
      "Can't Load Recipes",
      `Error fetching recipes from Edamam: ${error.message}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
    // console.error('Error fetching recipes from Edamam:', error);
    throw error;
  }
};

const fetchRecipesByMealType = async (mealType) => {
  const params = {
    app_id: appId,
    app_key: appKey,
    q: '', // Empty query to fetch random recipes
    mealType: mealType
  };

  try {
    const response = await axios.get(baseUrl, { params });
    const recipes = response.data.hits;
    const randomRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 5);
    return randomRecipes;
  } catch (error) {
    Alert.alert(
      "Can't Load Recipes",
      `Error fetching recipes from Edamam: ${error.message}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
    // console.error('Error fetching recipes from Edamam:', error);
    throw error;
  }
};


export { fetchRecipesFromEdamam, filters, fetchRecipesByMealType };