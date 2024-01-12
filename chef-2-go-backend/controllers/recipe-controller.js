/**
 * Recipe Controller
 * This module contains the controllers for handling HTTP requests related to recipes.
 * It interacts with the recipe service to perform CRUD operations.
 */

// Importing the recipe service and response handler
import * as recipeService from '../services/recipe-service.js';

import { setResponse, setErrorResponse } from './response-handler.js'

//Retrieve a list of recipes based on query parameters
export const find = async (request, response) => {
    try {
        const params = { ...request.query };
        const recipe = await recipeService.search(params);
        response.status(200)
            .json(recipe);
    } catch (err) {
        response.status(404)
            .json({
                code: "Error",
                message: "No Recipes"
            })
    }
}

export const findAll = async (request, response) => {
    try {
        const recipe = await recipeService.findAll();
        response.status(200)
            .json(recipe);
    }
    catch (err) {
        response.status(404)
            .json({
                code: "Error",
                message: err.message
            })
    }
}

//Retrieve a single recipe by its ID
export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const recipe = await recipeService.find(id);
        response.status(200)
            .json(recipe);
    } catch (err) {
        response.status(404)
            .json({
                code: "Error",
                message: "Recipe Not Found"
            })
    }
}

//Create a new recipe
export const post = async (request, response) => {
    try {
        console.log(`body: ${JSON.stringify(request.body)}`);
        const newRecipe = { ...request.body };
        const recipe = await recipeService.save(newRecipe);
        console.log(`recipe: ${JSON.stringify(recipe)}`);
        response.status(200)
            .json(recipe);
    } catch (err) {
        response.status(401)
            .json({
                code: "Error",
                message: err.message
            })
    }
}

//Update a recipe by its ID
export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const updatedRecipe = { ...request.body };
        const recipe = await recipeService.update(updatedRecipe, id);
        response.status(200)
            .json(recipe);
    } catch (err) {
        response.status(400)
            .json({
                code: "Error",
                message: "Invalid Input"
            })
    }
}

//Delete a recipe by its ID
export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const recipe = await recipeService.remove(id);
        response.status(200)
            .json(recipe);
    } catch (err) {
        response.status(404)
            .json({
                code: "Error",
                message: "Recipe not Found"
            })
    }
}

export const findByChefId = async (request, response) => {
    try {
        const id = request.params.id;
        const recipes = await recipeService.findByChefId(id);
        response.status(200)
            .json(recipes);
    } catch (err) {
        response.status(404)
            .json({
                code: "Error",
                message: "Recipe not Found"
            })
    }
}