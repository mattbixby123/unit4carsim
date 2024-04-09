const router = require("express").Router();

router.use("/items", require("./items"));
router.use("/reviews", require("./reviews"));
router.use("/comments", require("./comments"));

module.exports = router;