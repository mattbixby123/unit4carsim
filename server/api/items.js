const router = require("express").Router();
const { prisma } = require("../db");

// TEST - GET '/items' to fetch all items
router.get("/", async (req, res, next) => {
  try {
    const items = await prisma.items.findMany();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// TEST - GET '/items/:id' - to fetch details of a specific item
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await prisma.items.findUnique({
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
