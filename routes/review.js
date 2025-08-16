const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor }= require("../middleware.js");

const reviewControl = require("../controllers/reviews.js");



//Reviews
//post Review Route
router.post(
  '/',
  isLoggedIn,
  validateReview,
  wrapAsync(reviewControl. createReview)
);


//Delete Review Route
router.delete(
  "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
  wrapAsync(reviewControl.destoryReview)
);

module.exports = router;