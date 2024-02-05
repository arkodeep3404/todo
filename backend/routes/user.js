const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Todo } = require("../dbSchema");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/middleware");

const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string()
});

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            "message": "incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.status(411).json({
            "message": "email already exists"
        })
    }

    const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        "message": "user created",
        "token": token
    })
});

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    
    if (!success) {
        return res.status(411).json({
            "message": "incorrect email or password"
        })
    }

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (user) {
        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET)

        res.json({
            "token": token
        })
        return;
    }

    res.status(411).json({
        "message": "error while logging in"
    })
});

module.exports = router;