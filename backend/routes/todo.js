const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { Todo } = require("../dbSchema");
const router = express.Router();
const zod = require("zod");

router.get("/todos", authMiddleware, async (req, res) => {
    const userId = req.userId
    
    const todos = await Todo.find({
        userId: userId
    })

    res.status(200).json({
        "todos": todos
    })
});

const todoBody = zod.object({
    title: zod.string(),
    description: zod.string()
  });

router.post("/todo", authMiddleware, async (req, res) => {
    const { success } = todoBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            "message": "incorrect inputs"
        })
    }

    await Todo.create({
        userId: req.userId,
        title: req.body.title,
        description: req.body.description
    })

    res.status(200).json({
        "message": "todo added"
    })
});

router.delete("/todo/:todoId", authMiddleware, async (req, res) => {
    const userId = req.userId
    const todoId = req.params.todoId;

    console.log(todoId)

    await Todo.deleteOne({
        userId: userId, 
        _id: todoId 
    })
   
    res.status(200).json({
        "message": "todo deleted"
    })
});

module.exports = router;