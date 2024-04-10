const router = require("express").Router();
const { prisma } = require("../db");


// Deny access if user is not logged in
router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

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

// POST /comments
router.post("/", async (req, res, next) => {
  try {
    const { id } = req.user; 
    console.log(req.user); // used to check if we needed id or userId ... we needed to call id from req.user instead of userId
    const { itemId, reviewId, text } = req.body;
    const comment = await prisma.comments.create({
      data: {
        userId: id,
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

// PUT /comments/:id
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
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;