import express from "express";
const router = express.Router();
const { login, signup } = require("../controllers/UserController");

router.post("/signup", signup);
router.post("/login", login);

export default router;