const Task = require("../models/Task");


// Task Posting
const createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await new Task({
            title,
            description,
            user: req.user.id
        })

        await task.save();
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Task

const getTask = async (req, res) => {
    try {
        const task = await Task.find({ user: req.user.id });

        res.status(200).json({ tasks: task });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Task Update

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description ?? task.description;
        task.status = req.body.status ?? task.status;

        await task.save();
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Task Deletion

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: " Server Error" });
    }
};

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
};