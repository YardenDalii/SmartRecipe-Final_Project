import axios from 'axios';


// const appId = 'c16fb94a'; // Ester
// const appKey = '12d51a7d52eb0848281f09c84de1bc11'; // Ester
const appId = '9c1cfdae';
const appKey = '7c151817389f2a524a4feef22dbd7800';
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

// const fetchRecipesByMealType = async (mealType) => {
//   const params = {
//     app_id: appId,
//     app_key: appKey,
//     q: '', // Empty query to fetch random recipes
//     mealType: mealType
//   };

//   try {
//     const response = await axios.get(baseUrl, { params });
//     const recipes = response.data.hits;
//     const randomRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 5);
//     return randomRecipes;
//   } catch (error) {
//     Alert.alert(
//       "Can't Load Recipes",
//       `Error fetching recipes from Edamam: ${error.message}`,
//       [{ text: "OK", onPress: () => console.log("OK Pressed") }],
//       { cancelable: false }
//     );
//     // console.error('Error fetching recipes from Edamam:', error);
//     throw error;
//   }
// };

const _ = require('lodash');

const fetchRecipesByMealType = async (mealType, from = 0, to = 50, sliceSize = 10) => {
  const params = {
    app_id: appId,
    app_key: appKey,
    q: mealType, // Empty query to fetch random recipes
    // mealType: mealType,
    from: from, // Start index for fetching recipes
    to: to     // End index for fetching recipes
  };

  try {
    const response = await axios.get(baseUrl, { params });
    const recipes = response.data.hits;

    // Ensure that the number of recipes fetched is sufficient
    if (recipes.length < sliceSize) {
      return recipes; // Return all recipes if there are fewer than sliceSize recipes
    }

    // Generate a set of unique random indices
    const randomIndices = new Set();
    while (randomIndices.size < sliceSize) {
      const randomIndex = Math.floor(Math.random() * (to - from)) + from;
      randomIndices.add(randomIndex);
    }

    // Select the recipes corresponding to the unique random indices
    const randomRecipes = Array.from(randomIndices).map(index => recipes[index - from]);

    return randomRecipes;
  } catch (error) {
    Alert.alert(
      "Can't Load Recipes",
      `Error fetching recipes from Edamam: ${error.message}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
    throw error;
  }
};


export { fetchRecipesFromEdamam, filters, fetchRecipesByMealType };