const mongoose = require("mongoose");
const { User, Thought } = require("../models");
const connection = require("../config/connection");

const seedData = async () => {
  try {
    // Remove existing data so no errors take place...
    await Thought.deleteMany({});
    await User.deleteMany({});

    // Create 3 users
    const user1 = await User.create({
      username: "user1",
      email: "user1@example.com",
    });
    const user2 = await User.create({
      username: "user2",
      email: "user2@example.com",
    });
    const user3 = await User.create({
      username: "user3",
      email: "user3@example.com",
    });

    // Create 5 thoughts
    const thought1 = await Thought.create({
      thoughtText: "This is thought 1. Cherish me:)",
      username: user1._id,
    });
    user1.thoughts.push(thought1._id); // Push thought1 to user1's thoughts array

    const thought2 = await Thought.create({
      thoughtText: "This is thought 2. Wow, very awesome!!!!!",
      username: user2._id,
    });
    user2.thoughts.push(thought2._id); // Push thought2 to user2's thoughts array

    const thought3 = await Thought.create({
      thoughtText: "This is thought 3. Feeling excited!",
      username: user1._id,
    });
    user1.thoughts.push(thought3._id); // Push thought3 to user1's thoughts array

    const thought4 = await Thought.create({
      thoughtText: "This is thought 4. Hello everyone!",
      username: user3._id,
    });
    user3.thoughts.push(thought4._id); // Push thought4 to user3's thoughts array

    const thought5 = await Thought.create({
      thoughtText: "This is thought 5. What a beautiful day!",
      username: user2._id,
    });
    user2.thoughts.push(thought5._id); // Push thought5 to user2's thoughts array

    // Create 4 reactions
    const reaction1 = {
      reactionBody: "Great thought!",
      username: user2._id,
    };
    // reaction1.push(user2._id); // Push user info to reactions' username

    const reaction2 = {
      reactionBody: "I agree!",
      username: user1._id,
    };
    // reaction2.push(user1._id); // Push user info to reactions' username

    // Add reactions to thoughts
    thought1.reactions.push(reaction1);
    thought1.reactions.push(reaction2);
    thought2.reactions.push(reaction1);
    thought3.reactions.push(reaction2);

    // Save thoughts with reactions
    await thought1.save();
    await thought2.save();
    await thought3.save();

    // Add friends to users
    user1.friends.push(user2._id, user3._id);
    user2.friends.push(user1._id, user3._id);
    user3.friends.push(user1._id, user2._id);

    // Save users with friends and thoughts
    await user1.save();
    await user2.save();
    await user3.save();

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

// Connect to the MongoDB database
connection
  .on("error", (err) =>
    console.error("Error connecting to the MongoDB database:", err)
  )
  .once("open", () => {
    console.log("Connected to the MongoDB database.");
    // Seed the data
    seedData();
  });
