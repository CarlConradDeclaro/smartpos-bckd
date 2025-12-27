import { Router } from "express";
import cors from "cors";
import * as controller from "../controllers/purchase-order.controller";

const poRouter = Router();
poRouter.use(cors());

poRouter.get("/", controller.getAllPO);
poRouter.post("/", controller.createPO);


export default poRouter;
