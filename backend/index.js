require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();


app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"));
// Set up multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
});





//route
app.get('/api/recipes', async (req, res) => {
  const recipes = await prisma.recipe.findMany();
  res.json(recipes);
});

app.post("/api/recipes", upload.single("image"), async (req, res) => {
  const { name, subtitle, description, ingredient, steps } = req.body;

  try {
    // Get the file path of the uploaded image
    const imagePath = req.file ? req.file.path : null;

    const newRecipe = await prisma.recipe.create({
      data: {
        name,
        subtitle,
        image: imagePath,
        description,
        ingredient,
        steps,
      },
    });

    res.json(newRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT endpoint for updating recipe by ID
app.put("/api/recipes/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, subtitle, description, ingredient, steps } = req.body;

  try {
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Check if a new image is uploaded
    const imagePath = req.file ? req.file.path : existingRecipe.image;

    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        subtitle,
        image: imagePath,
        description,
        ingredient,
        steps,
      },
    });

    res.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// DELETE endpoint for deleting recipe by ID
app.delete("/api/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Hapus resep dari database
    await prisma.recipe.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(8000, () => {
  console.log("Server started on port 8000");
});
