// frontend/src/App.js
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  // Outlet,
  createRoutesFromElements,
  Route,
  // ScrollRestoration,
} from "react-router-dom";
import ManageRecipe from './pages/ManageRecipe';
import AddRecipe from './pages/AddRecipe';
import Home from './pages/Home';  // Tentukan komponen Home sesuai kebutuhan Anda
import EditRecipe from './pages/EditRecipe';
import RecipeDetail  from './pages/RecipeDetail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path="/manage" element={<ManageRecipe/>}></Route>
      <Route path="/addrecipe" element={<AddRecipe/>}></Route>
      <Route path="/editrecipe/:id" element={<EditRecipe/>}></Route>
      <Route path="/recipedetail/:id" element={<RecipeDetail/>}></Route>
    </Route>
    ))

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

