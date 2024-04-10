const router = require("express").Router();
const { prisma } = require("../db");

// WORKING, pre comment adding - GET /comments/me
router.get("/me", async (req, res, next) => {
  try {
    let comments;

    const { userId } = req.query;
    // check if user is authenticated
    if (req.user) {
      comments = await prisma.comments.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
    }
  
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// TEST - POST /comments
router.post("/", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { itemId, reviewId, text } = req.body;
    const comment = await prisma.comments.create({
      data: {
        userId: userId,
        itemId: parseInt(itemId),
        reviewId: parseInt(reviewId),
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
    res.status(204).send("Comment deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;