const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Onde está seu nome?"]
  },
  address: {
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    house: {
      type: String,
      required: false,
    },
  },
  deleted: {
    type: Boolean,
    required: false,
    default: false
  },
  phones: [{
    number: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: new Date()
    }
  }],
  email: {
    type: String,
    required: false,
    trim: true,
    index: true,
    unique: true
  },

}, { timestamps: true });
ContactSchema.index({ '$**': 'text' });
module.exports = mongoose.model("Contacts", ContactSchema);
