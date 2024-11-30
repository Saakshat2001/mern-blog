import { findproductinfo , deleteCard , editCard} from "../controllers/product.controller.js";
// import { google } from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

// router.post("/signin", signin);
// router.post("/login", login);


router.get("/findproduct/:userId" , findproductinfo )
router.delete('/deleteCard/:cardId', deleteCard);
router.put('/editCard/:cardId', editCard);

export default router;