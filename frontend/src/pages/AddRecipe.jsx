// frontend/src/pages/AddRecipe.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addRecipe } from '../modules/fetch';
import './EditRecipe.css'; // Import gaya dari EditRecipe.css

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    image: null,
    description: '',
    ingredient: '',
    steps: '',
  });
  const [showModal, setShowModal] = useState(false);

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
      const newRecipe = await addRecipe(data);
      console.log('New Recipe:', newRecipe);
      setShowModal(true);
      // Lakukan sesuatu setelah menambahkan resep, seperti kembali ke halaman ManageRecipe
    } catch (error) {
      console.error('Error adding recipe:', error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="edit-recipe-container">
      <div className="left-column">
        {/* Content for the left column */}
      </div>
      <div className="main-column">
        <header>
          <h1>Add Recipe</h1>
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
              <textarea name="ingredient" value={formData.ingredient} onChange={handleChange} />
            </div>
            <div className="form-field2">
              <label>Steps:</label>
              <br />
              <textarea name="steps" value={formData.steps} onChange={handleChange} />
            </div>
            <button type="submit" className="submit-button">Add Recipe</button>
          </form>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <p>Recipe Successfully Added</p>
                <button onClick={closeModal}>OK</button>
              </div>
            </div>
          )}
        </main>
      </div>
      <div className="right-column">
        {/* Content for the right column */}
      </div>
    </div>
  );
};

export default AddRecipe;
