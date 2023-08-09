const mongoose = require("mongoose");
const dateStamp = require("../utils/dateStamp");

// Reaction subdocument schema. NOT A MODEL!
const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  // Reference to the User model (not a random string...)
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Format the timestamp on query (this is not working as intended; fix in the future)
    get: (timestamp) => dateStamp(timestamp),
  },
});

// export data
module.exports = reactionSchema;
