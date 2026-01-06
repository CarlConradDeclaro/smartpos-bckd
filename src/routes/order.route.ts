import { Router } from "express";
import cors from "cors";
import * as controller from "../controllers/order.controller";

const orderRouter = Router();
orderRouter.use(cors());

orderRouter.get("/", controller.getAllOrder);
orderRouter.post("/", controller.createOrder);


export default orderRouter;
