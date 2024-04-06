const router = require("express").Router();
const { prisma } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const axios = require("axios");

// Register a new user

// Login to an exisiting user account

// Get the currently logged in user ?? NOT SURE IF THIS WORKS 
router.get("/me", async (req, res, next) => {
  try {
    let user;
    

    // Check if user is authenticated
    if (req.user) {
      user = await prisma.users.findUnique({
        where: {
          id: req.user.id,
        },
      });
      console.log('user - ', user)

      res.send(user);
    }

  } catch (error) {
    next(error);
  }
});

module.exports = router;
