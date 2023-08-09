const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  // updateReaction, 
  deleteReaction,
} = require("../../controllers/thoughtController");

// GET All/POST THOUGHTS--> Access thoughts through: /api/thoughts
router.route("/").get(getThought).post(createThought);

// GET One/PUT/DELETE Thoguht--> Access thought through: /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// POST reaction--> Access reactions through: /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction); 

// DELETE (update/put will later be aplied in the future) reaction--> Access reactions through: /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route("/:thoughtId/reactions/:reactionId")
  // .put(updateReaction)
  .delete(deleteReaction);

module.exports = router;
