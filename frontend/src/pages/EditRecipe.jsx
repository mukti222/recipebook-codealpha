// frontend/src/pages/EditRecipe.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRecipeById, editRecipe } from '../modules/fetch';
import './EditRecipe.css'; // Import file CSS

const EditRecipe = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    image: null,
    description: '',
    ingredient: '',
    steps: '',
  });

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const recipeDetails = await getRecipeById(id);
        setFormData({
          name: recipeDetails.name,
          subtitle: recipeDetails.subtitle,
          description: recipeDetails.description,
          ingredient: recipeDetails.ingredient,
          steps: recipeDetails.steps,
        });
      } catch (error) {
        console.error('Error fetching recipe details:', error.message);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('subtitle', formData.subtitle);
    data.append('image', formData.image);
    data.append('description', formData.description);
    data.append('ingredient', formData.ingredient);
    data.append('steps', formData.steps);

    try {
      const updatedRecipe = await editRecipe(id, data);
      console.log('Updated Recipe:', updatedRecipe);
      // Lakukan sesuatu setelah mengedit resep, seperti kembali ke halaman ManageRecipe
    } catch (error) {
      console.error('Error editing recipe:', error.message);
    }
  };

  return (
    <div className="edit-recipe-container">
      <div className="left-column">
        {/* Content for the left column */}
      </div>
      <div className="main-column">
        <header>
          <h1>Edit Recipe</h1>
          <Link to="/manage">
            <button type="back" className="back-button">
            Back to Manage Recipe
            </button>
          </Link>
          <div className='bottom'></div>
        </header>
        <main>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-field">
              <label>Name:</label>
              <br />
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Subtitle:</label>
              <br />
              <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Image:</label>
              <br />
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Description:</label>
              <br />
              <textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="form-field2">
              <label>Ingredient:</label>
              <br />
              <textarea className='ingredient' name="ingredient" value={formData.ingredient} onChange={handleChange} />
            </div>
            <div className="form-field2">
              <label>Steps:</label>
              <br />
              <textarea className='steps' name="steps" value={formData.steps} onChange={handleChange} />
            </div>
            <button type="submit" className="submit-button">Update Recipe</button>
          </form>
        </main>
      </div>
      <div className="right-column">
        {/* Content for the right column */}
      </div>
    </div>
  );
};

export default EditRecipe;
