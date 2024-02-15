const express = require("express");
const router = express();
const authController = require("../controllers/authController");


router.post("/signup",  authController.signup_post);

router.post("/login", authController.login_post);

router.post("/forgot_password", authController.forgot_post);

router.patch("/reset_password/:token", authController.reset_password);

router.get("/logout", authController.logout_get);



module.exports = router;