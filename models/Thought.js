const mongoose = require("mongoose");
const reactionSchema = require("./Reaction");
const dateStamp = require("../utils/dateStamp");

// Thought schema
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Format the timestamp on query (Fix for future as format is not as intended!)
      get: (timestamp) => dateStamp(timestamp),
    },
    // Reference to the User model (I find this much better and more meaningful that simply having a random string assigned as a username!!!)
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Array of nested reaction subdocuments
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      // Hide the version field
      versionKey: false,
      // Transform function to replace the username field with the actual username
      transform: function (doc, ret) {
        if (ret.username) {
          ret.username = ret.username.username;
        }
        // Remove the 'id' field from the response
        delete ret.id;

        return ret;
      },
    },
  }
);

// This transforms the object into what I need and disregards what I do not need
thoughtSchema.options.toJSON.transform = function (doc, ret, options) {
  if (ret.username) {
    // Replace the username with the actual username (instead of id)
    ret.username = ret.username.username;
  }
  
  if (ret.reactions && ret.reactions.length > 0) {
    ret.reactions.forEach((reaction) => {
      if (reaction.username) {
        // Replace the reaction's username with the actual username
        reaction.username = reaction.username.username;
      }
      // Remove the userId field from reactions since we're using the actual username
      delete reaction.userId;
    });
  }
  
  // Remove the 'id' field from the response
  delete ret.id;

  return ret;
};



// Define a virtual property 'reactionCount' that retrieves the length of the 'reactions' array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

// export data
module.exports = Thought;
