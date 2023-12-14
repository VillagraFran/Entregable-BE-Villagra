import { Router } from "express";
import {
    createCart,
    getCart,
    deleteCart
} from "../controllers/cart.manager.js";

const router = Router();

router.get('/', getCart);
router.get('/:cid', getCart);
router.post('/', createCart);
router.delete('/:cid', deleteCart);

export default router;