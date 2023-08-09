const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Regular expression to validate email format
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // Reference to the Thought model
        ref: "Thought",
      },
    ], 
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // Self-reference to the User model
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      // Hide the version field
      versionKey: false,
      // Transform func to use what we need and remove what we do not need; basically look better and less crowded!
      transform: (doc, ret) => {
        // Include friendId
        if (ret.friends && ret.friends.length > 0) {
          ret.friends = ret.friends.map((friend) => ({
            friendId: friend._id,
          }));
        }

        // Remove the 'id' field from the response
        delete ret.id;

        // return the modified 'ret' object
        return ret;
      },
    },
  }
);

// Define a virtual property 'friendCount' that retrieves the length of the 'friends' array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model using the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
