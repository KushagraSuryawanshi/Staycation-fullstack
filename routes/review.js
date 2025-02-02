const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utilities/wrapAsync.js");
const ExpressError = require("../utilities/ExpressError.js");
const { reviewSchema } = require("../schema.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details
      .map((el) => {
        return el.message;
      })
      .join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Review Post Route
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    let review = new Review(req.body.review);

    listing.reviews.push(review);

    review.save();
    listing.save();
    req.flash("success", "New Review Added");

    res.redirect(`/listings/${id}`);
  })
);

//Review Delete Route
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Succesfully");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
