const router = require("express").Router();
const apiRoutes = require("./api");

// api routes
router.use("/api", apiRoutes);

// if not a defined route
router.use((req, res) => {
  return res.send("404 Not Found");
});

module.exports = router;