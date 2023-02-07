const NodeGeocoder = require("node-geocoder");
const dotenv = require("dotenv");

// load vars
dotenv.config({ path: "./config/config.env" });

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_KEY,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
