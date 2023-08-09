const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// corresponding users and thoughts routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
