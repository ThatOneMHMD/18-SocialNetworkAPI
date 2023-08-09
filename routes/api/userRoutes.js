const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  removeFriendFromUser, 
  // updateFriendsForUser,
} = require("../../controllers/userController");

// GET All/POST USERS--> Access through: /api/users
router.route("/").get(getUsers).post(createUser);

// GET One/PUT/DELETE User--> Access through: /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// POST new friend--> Access through: /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriendToUser);

// DELETE friend--> Access through: /api/users/:userId/friends/:friendID
router.route("/:userId/friends/:friendId").delete(removeFriendFromUser); 

// //for future improvements add a route to update friends!
// // Access through: /api/users/:userId/friends/update
// router.route("/:userId/friends/update").put(updateFriendsForUser);

module.exports = router;
