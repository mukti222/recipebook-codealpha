// RecipeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeById } from "../modules/fetch/index";
import "./RecipeDetail.css"; // Impor file CSS

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const recipeDetailData = await getRecipeById(id);
        setRecipeDetail(recipeDetailData);
      } catch (error) {
        console.error("Error fetching recipe detail:", error.message);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (!recipeDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="recipeheader">
        <div>
        <Link to="/home">
          <button>Back</button>
        </Link>
        </div>
        <div>
          <h1>{recipeDetail.name}</h1>
        </div>
        <div>
          {/* <h2>{</h2> */}
        </div>
      </div>
      <div className="main1">
        <div className="main1child1">
          <img
            src={`http://localhost:8000/${recipeDetail.image}`}
            alt={recipeDetail.name}
          />
        </div>
        <div className="main1child2">
            <div className="lowerchild2">
            <h2>{recipeDetail.subtitle}</h2>
          <p>{recipeDetail.description}</p>
          <h3>Ingredients: </h3>
          <p>{recipeDetail.ingredient}</p>
            </div>
        </div>
      </div>
      <div className="main2">
      <h3>Steps: </h3>
      <p style={{ whiteSpace: 'pre-line' }}>
    {recipeDetail.steps.split(/\d+\./)
      .filter(step => step.trim() !== '') // Menghapus elemen kosong
      .map((step, index) => `${index + 1}. ${step.trim()}`)
      .join('\n')}
  </p>
      </div>
    </div>
  );
};

export default RecipeDetail;