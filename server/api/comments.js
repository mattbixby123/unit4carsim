const router = require("express").Router();
const { prisma } = require("../db");

// TEST - GET /comments/me
router.get("/me", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const comments = await prisma.comments.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// TEST - POST /comments
router.post("/", async (req, res, next) => {
  try {
    const { userId, itemId, text } = req.body;
    const comment = await prisma.comments.create({
      data: {
        userId: parseInt(userId),
        itemId: parseInt(itemId),
        text: text || null,
      },
    });
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

// TEST - PUT /comments/:id
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await prisma.comments.update({
      where: {
        id: parseInt(id),
      },
      data: {
        text: text || null,
      },
    });
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

// TEST - DELETE /comments/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.comments.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Comment deleted successfully" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;