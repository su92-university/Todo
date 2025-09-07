import express from "express"
import { protect } from "../middleware/middleware.js"
import { loaduser, login, register, verifyotp } from "../Controllers/AuthController.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",login) 
router.post("/verifyotp",verifyotp)
router.get("/profile",protect,loaduser)
 
export default router