const axios = require("axios");
const {v4: uuidv4} = require("uuid");
require("dotenv").config();
const { API_KEY, APY_URL} = process.env;
const { Recipe, Diet} = require("../db");




/* GET /types:
Obtener todos los tipos de dieta posibles
 En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados 
 por spoonacular:
  */
 const loadDietInDbIfNotExist = async () => {
    const dietsFromApi = [
    "vegetarian",
    "gluten free",
    "dairy free",
    "lacto ovo vegetarian",
    "vegan",
    "paleolithic",
    "primal",
    "whole 30",
    "pescatarian",
    "ketogenic",
    "fodmap friendly",
    ];
    const diets = await Diet.findAll();
    if(diets.length === 0) {
        dietsFromApi.forEach(async (el) => {
            await Diet.create({
                id: uuidv4(),
                name: el
            });
        });
    }
    return dietsFromApi;
 };

 const getAllDiets = async(req, res) => {
    const allDiet = await loadDietInDbIfNotExist();
    res.json(allDiet)
 };

 module.exports={
    loadDietInDbIfNotExist,
    getAllDiets
 };