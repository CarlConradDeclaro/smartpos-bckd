import { Router } from "express";
import cors from "cors";
import * as controller from "../controllers/rawmaterial.controller";

const rawMaterialRouter = Router();
rawMaterialRouter.use(cors());

rawMaterialRouter.get("/", controller.getAllRawMaterial);
rawMaterialRouter.post("/", controller.createRawMaterial);


export default rawMaterialRouter;
