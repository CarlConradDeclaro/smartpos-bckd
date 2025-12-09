import { Router } from "express";
import * as controller from "../controllers/purchase-order.controller";
import { getProducts } from "../controllers/Products.controller";

const router = Router();

router.get("/purchase-orders", controller.getAllPO);
router.get("/purchase-orders/:id", controller.getPO);
router.post("/purchase-orders", controller.createPO);

router.get("/products", getProducts);

export default router;
