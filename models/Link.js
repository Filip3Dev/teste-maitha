const mongoose = require('mongoose');
const LinkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: false,
    },
    pixel: {
      type: String,
      required: false,
    },
    short_link: {
      type: String,
      required: false,
    },
    views: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('Link', LinkSchema);
