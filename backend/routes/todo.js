const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { Todo } = require("../dbSchema");
const router = express.Router();
const zod = require("zod");

router.get("/todos", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const filter = req.query.filter || "";

  const todos = await Todo.find({
    userId: userId,
    $or: [
      {
        title: {
          $regex: filter,
        },
      },
      {
        description: {
          $regex: filter,
        },
      },
    ],
  });

  res.status(200).json({
    todos: todos,
  });
});

const todoBody = zod.object({
  title: zod.string(),
  description: zod.string(),
});

router.post("/todo", authMiddleware, async (req, res) => {
  const { success } = todoBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }

  await Todo.create({
    userId: req.userId,
    title: req.body.title,
    description: req.body.description,
  });

  res.status(200).json({
    message: "todo added",
  });
});

router.delete("/todo", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const todoId = req.query.todoId;

  const todo = await Todo.findOne({
    userId: userId,
    _id: todoId,
  });

  if (todo) {
    await Todo.deleteOne({
      userId: userId,
      _id: todoId,
    });

    res.status(200).json({
      message: "todo deleted",
    });
  } else {
    res.status(400).json({
      message: "incorrect id",
    });
  }
});

module.exports = router;
