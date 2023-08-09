const mongoose = require("mongoose");
const { Thought, User } = require("../models");

// Get all thoughts and populate the username and reaction associated with each one
const getThought = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate([
      { path: "username" },
      { path: "reactions.username" },
    ]);

    res.status(200).json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// get a single thought and populate the username and reaction associated with it
const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId)
      .populate("username")
      .populate("reactions.username");

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create a new thought
const createThought = async (req, res) => {
  try {
    const result = await Thought.create(req.body);
    res.status(200).json({ message: "Success", thought: result });
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a thought
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    thought.thoughtText = req.body.thoughtText;
    thought.username = req.body.username;
    await thought.save();

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete a thought
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({
      _id: req.params.thoughtId,
    });
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// add a reaction to a thought
const addReaction = async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;

    if (!mongoose.isValidObjectId(thoughtId)) {
      return res.status(400).json({ message: "Invalid thoughtId" });
    }

    const userId = req.body.username;
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const newReaction = {
      reactionBody: req.body.reactionBody,
      username: userId, // convert the username to ObjectId
    };

    // here we use findOneAndUpdate to remove the reaction with the specified reactionId from the array
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $addToSet: { reactions: newReaction } },
      { new: true } // return the updated thought after the operation
    );

    if (!updatedThought) {
      // note that if the updatedThought is null, the thought or reaction was not found
      return res.status(404).json({ message: "Thought or reaction not found" });
    }

    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// // THIS WILL BE LEFT FOR FUTURE UPDATES as it is not required for this challenge!!!!
// const updateReaction = async (req, res) => {
//   try {
//     const thought = await Thought.findById(req.params.thoughtId);
//     if (!thought) {
//       return res.status(404).json({ message: "Thought not found" });
//     }

//     const reaction = thought.reactions.find(
//       (reaction) => reaction._id.toString() === req.params.reactionId
//     );
//     if (!reaction) {
//       return res.status(404).json({ message: "Reaction not found" });
//     }

//     const userId = mongoose.Types.ObjectId(req.body.username);
//     const userExists = await User.exists({ _id: userId });
//     if (!userExists) {
//       return res.status(400).json({ message: "User does not exist" });
//     }

//     reaction.reactionBody = req.body.reactionBody;
//     reaction.username = userId; // Use the ObjectId of the user
//     await thought.save();

//     res.status(200).json(thought);

//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// delete a reaction
const deleteReaction = async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;

    if (
      !mongoose.isValidObjectId(thoughtId) ||
      !mongoose.isValidObjectId(reactionId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid thoughtId or reactionId" });
    }

    // here we use findOneAndUpdate to remove the reaction with the specified reactionId from the array
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { _id: reactionId } } },
      { new: true } // thos returns the updated thought after the operation
    );

    if (!updatedThought) {
      // If the updatedThought is null, the thought or reaction was not found
      return res.status(404).json({ message: "Thought or reaction not found" });
    }

    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,

  // updateReaction,
};
