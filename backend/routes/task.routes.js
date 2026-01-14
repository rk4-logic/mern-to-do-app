const express = require('express');
const { createTask, getTask, updateTask, deleteTask } = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();


router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
