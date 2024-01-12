import mongoose from "mongoose";
const Schema = mongoose.Schema;
/**
 * Recipe schema to define the structure of Recipe documents in MongoDB.
 */
const RecipeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        chef: {
            type: String,
            required: true,
        },
        chefId: {
            type: String,
            required: true,
        },
        summary:{
            type: String,
            required: true
        },
        instructions: {
            type: Array,
            required: true
        },
        ingredients: {
            type: Array,
            required: true,
            name: {
                type: String
            },
            quanity: {
                type: String,
            },
            unitType: {
                type: String
            }
        },
        video: {
            type: String,
        },
        gifs: {
            type: String
        },
        comment: {
            type: String,
            // ref: 'Comment',
            default: null
        },
        imageUrl: {
            type: String
        }
    },
    {
        versionKey: false,
    }
)

const RecipeModel = mongoose.model("recipe", RecipeSchema);

export default RecipeModel;