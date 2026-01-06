import { Router } from "express";
import cors from "cors";
import * as controller from "../controllers/product.controller";

const productRouter = Router();
productRouter.use(cors());

productRouter.get("/", controller.getAllProduct);
productRouter.post("/", controller.createProduct);


export default productRouter;
