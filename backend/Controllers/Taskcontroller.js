import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content ) { 
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const newTask = new Task({ 
            title, 
            content, 
            user: req.user._id 
        });
        await newTask.save();
        res.status(201).json({ success: true, message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, isDone } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: req.user._id }, 
            { title, content, isDone }, 
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found or you don't have permission to update this task" });
        }
        res.status(200).json({ success: true, message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user._id });
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Task not found or you don't have permission to delete this task" });
        }
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = await Task.findOne({ 
            _id: id, 
            user: req.user._id 
        });
        
        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: "Task not found or you don't have permission to access this task" 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            task 
        });
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
};

export const toggleTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Toggling task status for ID:", id);
        const task = await Task.findOne({ 
            _id: id, 
            user: req.user._id 
        });
        
        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: "Task not found or you don't have permission to access this task" 
            });
        }
        
        task.isDone = !task.isDone;
        await task.save();
        
        res.status(200).json({ 
            success: true, 
            message: "Task status updated successfully", 
            task 
        });
    } catch (error) {
        console.error("Error toggling task status:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
};
