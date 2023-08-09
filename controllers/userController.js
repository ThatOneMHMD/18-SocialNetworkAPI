const { User, Thought } = require("../models");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("thoughts").exec();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a specific user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("thoughts");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create a new user
const createUser = async (req, res) => {
  try {
    const result = await User.create(req.body);

    res.status(200).json({ message: "Success", user: result });
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.username;
    user.email = req.body.email;

    // Update friends if provided in the request body
    if (req.body.friends && Array.isArray(req.body.friends)) {
      user.friends = req.body.friends;
    }

    // Update thoughts if provided in the request body
    if (req.body.thoughts && Array.isArray(req.body.thoughts)) {
      user.thoughts = req.body.thoughts;
    }

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete user 
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// add friend to a specific user
// NOTE: u can add the friend even if they are not a user: fix for future improvements (not required for grading!)
const addFriendToUser = async (req, res) => {
  try {
    const userSpecial = await User.findById(req.params.userId);

    if (userSpecial.friends.includes(req.params.friendId)) {
      return res.status(200).json({ message: "Friend already exists!" });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Friend added successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete a friend from a specific user
const removeFriendFromUser = async (req, res) => {
  try {
    const userSpecial = await User.findById(req.params.userId);

    if (!userSpecial.friends.includes(req.params.friendId)) {
      return res
        .status(400)
        .json({ message: "Friend ID is invalid, please try again!" });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Friend removed successfully", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

// //for futrue improvements: will have the ability to update friends for user; not required here!!!!
// const updateFriendsForUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const newFriendsArray = req.body.friends;

//     await user.updateFriends(newFriendsArray);

//     res.status(200).json({ message: "Friends updated successfully" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// export data
module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  removeFriendFromUser,

  // updateFriendsForUser,
};
