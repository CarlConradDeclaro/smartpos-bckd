import { Router } from "express";
import cors from "cors";
import * as controller from "../controllers/orderitem.controller";

const orderItemRouter = Router();
orderItemRouter.use(cors());

orderItemRouter.get("/", controller.getAllOrderItem);
orderItemRouter.post("/", controller.createOrderItem);


export default orderItemRouter;
