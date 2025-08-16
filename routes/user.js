 const express = require('express');
 const router = express.Router();
 const User = require('../models/User.js');
 const wrapAsync = require('../utils/wrapAsync');
 const passport = require('passport');
 const {saveRedirectUrl} = require("../middleware.js");

 const userController = require("../controllers/users.js");

 router
 .route("/singup")
 .get(userController.renderSingupForm) 
 .post( wrapAsync(userController.singup)
);


router
 .route("/login")
 .get(userController.renderLoginForm )
 .post(
  saveRedirectUrl,
   passport.authenticate("local",
    { failureRedirect: '/login',
    failureFlash: true}),
    userController.login
    );

router.get("/logout", userController.logout );

 module.exports = router;