import { Router } from "express";
import cors from "cors";
import * as controller from "../controllers/product-ingredient.controller";

const productIngredientRouter = Router();
productIngredientRouter.use(cors());

productIngredientRouter.get("/", controller.getAllProductIngredient);
productIngredientRouter.post("/", controller.createProductIngredient);


export default productIngredientRouter;
