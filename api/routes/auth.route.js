import express from "express";

import { signup } from "../controllers/auth.controller.js";
import { signin1 } from "../controllers/auth.controller.js";
import { google } from "../controllers/auth.controller.js";
const router = express.Router();
import { signIn  , login, enterproductinfo } from "../controllers/auth.controller.js";
router.post("/signup", signup);
 router.post("/signin1", signin1);
router.post("/google", google);

//------->>>>>
router.post("/signin", signIn);
router.post("/login", login);
router.post("/productInfo" ,enterproductinfo)
//---------->>>>>

export default router;
