const router = require("express").Router();
const { prisma } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const axios = require("axios");


// Register a new user account
router.post("/register", async (req, res, next) => {
  console.log("hello console!")
  try {
    const user = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      },
    });
    // Create a token with the instructor id
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    console.log('token - ', token)
    res.status(201).send({ token })

  } catch (error) {
    next(error);
  }
});

// Login to an exisiting user account
router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(401).send("invalid login credentials.");
    }
    
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT);
      res.send({ token })
    }
    else {
      return res.status(401).send("plaintext password provided does NOT match the hased password saved in database.")
    }

  } catch (error) {
    next(error);
  }
});

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
