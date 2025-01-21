const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://media.licdn.com/dms/image/D5612AQGA_E-rvcfi3w/article-cover_image-shrink_720_1280/0/1706066503702?e=2147483647&v=beta&t=dTdcYn1MoUN86znud8LsdLmJIprSXKPLEx0s3jTZ82s",
    set: (v) =>
      v === ""
        ? "https://media.licdn.com/dms/image/D5612AQGA_E-rvcfi3w/article-cover_image-shrink_720_1280/0/1706066503702?e=2147483647&v=beta&t=dTdcYn1MoUN86znud8LsdLmJIprSXKPLEx0s3jTZ82s"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
