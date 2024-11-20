import completeOrderModel from "../models/completeOrderModel.js";

/**
 * Build a user-item matrix based on order history.
 */
const buildUserCategoryMatrix = async () => {
    const orders = await completeOrderModel.find();
    const userCategoryMap = {};

    orders.forEach((order) => {
        const userId = String(order.userId); // Ensure userId is a string
        console.log("Processed User ID:", userId);

        // Initialize user entry if not already present
        if (!userCategoryMap[userId]) userCategoryMap[userId] = {};

        // Count frequency of each category for the user
        order.items.forEach((item) => {
            const category = item.category; // Use category instead of foodId
            if (category) {
                userCategoryMap[userId][category] = (userCategoryMap[userId][category] || 0) + 1;
            }
        });
    });

    return userCategoryMap;
};

/**
 * Generate recommendations for a user.
 */
const getRecommendations = async (req, res) => {
    const { userId } = req.params;

    try {
        // Build user-category matrix
        const userCategoryMap = await buildUserCategoryMatrix();
        console.log("User-Category Map:", userCategoryMap);

        // Convert the userId to string for comparison
        const targetUserCategories = userCategoryMap[String(userId)];
        console.log("Target User Categories:", targetUserCategories);

        if (!targetUserCategories) {
            console.log("No categories found for user:", userId);
            return res.status(200).json({
                success: true,
                data: [],
                message: "No orders found for the user",
            });
        }

        const scores = {};
        const categoryFrequency = {};

        // Compute similarity and score recommendations
        for (const otherUserId in userCategoryMap) {
            if (otherUserId === String(userId)) continue;

            const otherUserCategories = userCategoryMap[otherUserId];
            console.log("Other User Categories:", otherUserCategories);

            let similarity = 0;

            // Calculate similarity using dot product
            for (const category in targetUserCategories) {
                if (category in otherUserCategories) {
                    similarity +=
                        targetUserCategories[category] * otherUserCategories[category];
                }
            }

            console.log("Similarity Score:", similarity);

            // Normalize similarity (optional)
            const targetMagnitude = Math.sqrt(
                Object.values(targetUserCategories).reduce((sum, val) => sum + val ** 2, 0)
            );
            const otherMagnitude = Math.sqrt(
                Object.values(otherUserCategories).reduce((sum, val) => sum + val ** 2, 0)
            );

            if (targetMagnitude > 0 && otherMagnitude > 0) {
                similarity /= targetMagnitude * otherMagnitude;
            }

            // Score recommendations based on similarity
            for (const category in otherUserCategories) {
                if (!(category in targetUserCategories)) {
                    scores[category] = (scores[category] || 0) + similarity;
                    categoryFrequency[category] = (categoryFrequency[category] || 0) + 1;
                }
            }
        }

        // Normalize scores and sort recommendations
        const recommendedCategories = Object.keys(scores)
            .map((category) => ({
                category,
                score: scores[category] / (categoryFrequency[category] || 1),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 5); // Top 5 recommended categories

        console.log("Recommended Scores:", recommendedCategories);

        res.status(200).json({
            success: true,
            data: recommendedCategories,
        });
    } catch (error) {
        console.error("Error generating recommendations:", error.message);
        res.status(500).json({
            success: false,
            message: "Error generating recommendations",
            error: error.message,
        });
    }
};

export { getRecommendations };
