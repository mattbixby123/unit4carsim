const router = require("express").Router();
const { prisma } = require("../db");


// TEST - GET route '/reviews' -  to fetch all reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await prisma.reviews.findMany();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// TEST - GET '/reviews/me' - to fetch fetch all reviews written by a registered user
router.get("/me", async (req, res, next) => {
  try {
    let reviews;

    const { userId } = req.query;
    if (req.user) {
      reviews = await prisma.reviews.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
    }
  
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// TEST - POST '/reviews' - to submit a review
router.post("/", async (req, res, next) => {
  try {
    const { userId, itemId, rating, text } = req.body;
    const review = await prisma.reviews.create({
      data: {
        userId: parseInt(userId),
        itemId: parseInt(itemId),
        rating: parseInt(rating),
        text: text || null,
      },
    });
    res.json(review);
  } catch (error) {
    next(error);
  }
});

// TEST - PUT '/reviews/:id' - to update a review
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, text } = req.body;
    const review = await prisma.reviews.update({
      where: {
        id: parseInt(id),
      },
      data: {
        rating: parseInt(rating),
        text: text || null,
      },
    });
    res.json(review);
  } catch (error) {
    next(error);
  }
});

// TEST - DELETE '/reviews/:id/' - to delete a review
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.reviews.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Review deleted successfully" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});


module.exports = router;
