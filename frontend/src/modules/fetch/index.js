// src/modules/fetch/index.js
import { instance } from '../axios/index';

async function fetchRecipe() {
  try {
    const response = await instance.get('/api/recipes');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function addRecipe(formData) {
  try {
    const response = await instance.post('/api/recipes', formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}



async function getRecipeById(recipeId) {
  try {
    const response = await instance.get(`/api/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function editRecipe(recipeId, formData) {
  try {
    const response = await instance.put(`/api/recipes/${recipeId}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}


async function deleteRecipe(recipeId) {
  try {
    const response = await instance.delete(`/api/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Something went wrong');
  }
}




export { fetchRecipe, addRecipe, getRecipeById, editRecipe, deleteRecipe };
