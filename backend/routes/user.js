const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../dbSchema");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, email, password } = require("../config");
const { authMiddleware } = require("../middleware/middleware");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass: password,
  },
});

router.get("/me", authMiddleware, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(403).json({
      message: "not logged in",
    });
  }

  const user = await User.findById(userId);

  res.status(200).json({
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
});

const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "email already exists",
    });
  }

  const uid = [...Array(10)].map(() => Math.random().toString(36)[2]).join("");

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isVerified: false,
    token: uid,
  });

  await transporter.sendMail({
    from: '"NexaWings" <nexawingsenterprises@gmail.com>',
    to: req.body.email,
    subject: "Email Verification",
    html: `<p> Hi ${req.body.firstName}. Please verify your email. </p> 
    <a href = "http://localhost:3000/api/v1/user/verify/${uid}"> Click Here </a>`,
  });

  res.status(200).json({
    message: "user created. please verify email.",
  });
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "incorrect email or password",
    });
  }

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const isVerified = user.isVerified;

    if (isVerified) {
      const userId = user._id;

      const token = jwt.sign(
        {
          userId,
        },
        JWT_SECRET
      );

      res.status(200).json({
        token: token,
      });
    } else {
      res.status(403).json({
        message: "please verify email",
      });
    }
  } else {
    res.status(404).json({
      message: "no user exists",
    });
  }
});

router.get("/verify/:token", async (req, res) => {
  token = req.params.token;

  const user = await User.findOneAndUpdate(
    {
      token: token,
    },
    {
      $set: {
        isVerified: true,
        token: "",
      },
    }
  );

  if (!user) {
    res.status(404).json({
      message: "incorrect token",
    });
  } else {
    res.status(200).json({
      message: "email verified. please signin",
    });
  }
});

router.post("/forgot", async (req, res) => {
  const uid = [...Array(10)].map(() => Math.random().toString(36)[2]).join("");

  const user = await User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    {
      $set: {
        token: uid,
      },
    }
  );

  if (!user) {
    res.status(404).json({
      message: "incorrect email",
    });
  } else {
    await transporter.sendMail({
      from: '"NexaWings" <nexawingsenterprises@gmail.com>',
      to: req.body.email,
      subject: "Reset Password",
      html: `<p> Hi ${user.firstName}. Please use the link to reset password. </p> 
      <a href = "http://localhost:5173/reset/${uid}"> Click here </a>`,
    });

    res.status(200).json({
      message: "please check email to reset password",
    });
  }
});

router.post("/reset/:token", async (req, res) => {
  token = req.params.token;

  const user = await User.findOneAndUpdate(
    {
      token: token,
    },
    {
      $set: {
        password: req.body.password,
        token: "",
      },
    }
  );

  console.log(user);

  if (!user) {
    res.status(404).json({
      message: "incorrect token",
    });
  } else {
    res.status(200).json({
      message: "password updated",
    });
  }
});

module.exports = router;
