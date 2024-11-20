import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const Recommendations = ({ userId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const { url } = useContext(StoreContext);
  
    useEffect(() => {
        const fetchRecommendations = async () => {
          try {
            const response = await axios.get(`${url}/api/recommendations/${userId}`);
            setRecommendations(response.data.data); // Update state
            console.log("Updated Recommendations State:", response.data.data);
          } catch (error) {
            console.error("Error fetching recommendations:", error);
          }
        };
      
        fetchRecommendations();
      }, [url, userId]);
      
      
  
    return (
      <div>
        <h2>Recommended Categories</h2>
        {recommendations.length > 0 ? (
  <ul>
    {recommendations.map((rec, index) => (
      <li key={index}>
        <strong>Category:</strong> {rec.category}, <strong>Score:</strong>{" "}
        {rec.score.toFixed(2)}
      </li>
    ))}
  </ul>
) : (
  <p>
    No recommendations available at the moment. Try ordering some items to get personalized suggestions!
  </p>
)}

      </div>
    );
  };
  
  export default Recommendations;
  
