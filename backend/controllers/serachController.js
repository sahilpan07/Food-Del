import { getCategorySearchResults } from "./categoryController.js";
import { getFoodSearchResults } from "./foodController.js";
import { getRestaurantSearchResults } from "./restaurantController.js";

export const getSearchResults = async (req, res) => {
  try {
    const { query } = req.query;

    // Search for restaurants, food items, and categories
    const restaurants = await getRestaurantSearchResults(query);
    const foodItems = await getFoodSearchResults(query);
    const categories = await getCategorySearchResults(query);

    // Return combined results
    res.json({
      success: true,
      data: { restaurants, foodItems, categories },
    });
  } catch (error) {
    console.error("Error in global search:", error);
    res
      .status(500)
      .json({ success: false, message: "Error performing global search" });
  }
};
