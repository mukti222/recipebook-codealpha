// frontend/src/pages/ManageRecipe.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRecipe, deleteRecipe } from '../modules/fetch';
import './ManageRecipe.css'; // Import file CSS

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await fetchRecipe();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Hapus resep berdasarkan ID
      console.log('tes', id);
      await deleteRecipe(id);

      // Menampilkan pesan sukses atau melakukan sesuatu yang diperlukan
      console.log('Recipe deleted successfully');

      // Refresh daftar resep setelah menghapus
      const updatedRecipes = await fetchRecipe();
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error deleting recipe:', error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editrecipe/${id}`);
  };

  return (
    <div className="manage-recipe-container">
      <header>
        <h1 style={{ marginLeft: 100 + 'px' }}>Manage Recipe</h1>
        <Link to="/addrecipe" className="add-recipe-button">
          Add Recipe
        </Link>
      </header>
      <main>
        <table className="recipe-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name Recipe</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={recipe.id}>
                <td>{index + 1}</td>
                <td>{recipe.name}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(recipe.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ManageRecipe;
