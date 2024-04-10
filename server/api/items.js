const router = require("express").Router();
// const { prisma } = require("../db");

// GET '/items' to fetch all items
router.get("/", async (req, res, next) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// GET '/items/:id' - to fetch details of a specific item
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
