// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import "./Home.css";
import jumboImage from "../images/jumbo1.jpg";
import { fetchRecipe } from "../modules/fetch/index";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const truncateSubtitle = (subtitle, maxCharacters) => {
    if (subtitle.length > maxCharacters) {
      return subtitle.substring(0, maxCharacters) + "...";
    }
    return subtitle;
  };

  useEffect(() => {
    // Fetch recipes when the component mounts
    const getRecipes = async () => {
      try {
        const recipesData = await fetchRecipe();
        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    getRecipes();
  }, []);

  return (
    <div>
      <div className="navbar">
        <div className="left">
          <div className="title">Let Him Cook!</div>
          <div className="subtitle">
            <p>
              Explore a diverse collection of more than 100 delicious recipes
              from around the world. Embark on a delightful journey through
              international flavors and culinary traditions.
            </p>
          </div>
        </div>
        <div className="right">
          <div className="r2">
          <Link to="/manage">
              <button className="post"> Post Recipe</button>
            </Link>
          </div>
          <div></div>
        </div>
      </div>
      <div className="header"></div>
      <div className="main">
        <div className="titlemain">Recipes</div>
        <div className="centercard">
          <div className="recipe-card">
            {recipes.map((recipe) => (
              <div className="card" key={recipe.id}>
<img src={`http://localhost:8000/${recipe.image}`} alt={recipe.name} />
                <h1>{recipe.name}</h1>
                <p>{truncateSubtitle(recipe.subtitle, 30)}</p>
                <div className="buttoncard">
                  <div className="buttonblank"></div>
        <button>
        <Link to={`/recipedetail/${recipe.id}`} className="view-button">
          View
      </Link>
          </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at urna ac purus dapibus ullamcorper.</p>
          </div>
          <div className="footer-section">
            <h3>Explore</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Recipes</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@lethimcook.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul className="social-icons">
              <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i> Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i> Youtube</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Let Him Cook! All rights reserved.</p>
        </div>
      </div>
    </div>
    // https://i.pinimg.com/1200x/a0/5a/93/a05a93bcfe0b40dfd2d5722545497bb9.jpg
  );
};

export default Home;
