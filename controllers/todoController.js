const mongoose = require('mongoose');
const Task = require('../models/task');
// create task 
module.exports.addTask = async (req,res)=> {
    const categoryArray = ['urgent','important','save for later']
    const {title,
        description,
        category} = req.body;
    try {
        if(!title || title === '') {
            return res.status(400).json({message: 'Title cannot be empty'});
        } else if(!description || description === '') {
            return res.status(400).json({message: 'description cannot be empty'});
        } else if(!category || !categoryArray.includes(category)) {
            return res.status(400).json({message: 'Please include appropriate type of your task'});
        }
        const task = new Task({
            title: title,
            desrciption: description,
            isComplete: false,
            category: category
        })
        await task.save(); 
        if(task) {
            return res.status(200).json({message: 'Task created', data: task});
        }else{
            return res.status(400).json({message: 'unable to create task'});
        }

    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}
// update task
module.exports.updateTask = async (req,res)=>{
    const categoryArray = ['urgent','important','save for later']
    const {title,
    description,
    isComplete, category} = req.body;
    console.log(req.body);
    const taskId = req.params.id;
    try {
        if(!title || title === '') {
            return res.status(400).json({message: 'Title cannot be empty'});
        } else if(!description || description === '') {
            return res.status(400).json({message: 'description cannot be empty'});
        } else if(isComplete==='') {
            return res.status(400).json({message: 'status cannot be empty'});
        } else if(!category || !categoryArray.includes(category)) {
            return res.status(400).json({message: 'Please include appropriate type of your task'});
        }
        const task = await Task.findOneAndUpdate({_id:taskId},{$set: {
            title: title,
            description: description,
            isComplete: isComplete,
            category: category}
        }, {new: true});
        if(task) {
            return res.status(200).json({message: 'task updated', data: task});
        } else{
            return res.status(400).json({message: 'failed to update task'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};
// mark task as complete 
module.exports.markComplete = async (req,res)=>{
    const taskId = req.params.id;
    try {
        const task = await Task.findOne({_id: taskId});
        if(task) {
            if(task.isComplete === true) {
                return res.status(400).json({message: 'task already completed'});
            } else if(task.isComplete === false) {
               const updatedTask = await Task.findOneAndUpdate({_id: taskId},{$set: {isComplete: true}},{new: true});
                return res.status(200).json({message: 'task completed', data: updatedTask});
            }
        } else {
            return res.status(400).json ({message: 'task not found'});
        }

        }
     catch(err) {
        return res.status(500).json({message: err.message});
    }
}

// fetching all tasks
module.exports.getAllTasks = async (req,res)=> {
    try {
        await Task.find().then((tasks)=>{
            return res.status(200).json({data: tasks});
        }).catch((err) =>{
            return res.status(400).json({message: "error in fetching" + err.message});
        })
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
}
// fetching single task
module.exports.getTask = async (req,res)=>{
    const taskId = req.params.id;
    try {
        const task = await Task.findOne({_id: taskId});
        if(task) {
            return res.status(200).json({data: task});
        } else {
            return res.status(400).json({message: 'task not found'});
        }
    }catch(err) {
        return res.status(500).json({message: err.message});
    }
};
// delete task 
module.exports.deleteTask = async (req,res)=> {
    const taskId = req.params.id;
    try {
        const task = await Task.findOne({_id: taskId});
        if(!task) {
            return res.status(400).json({message: 'task not found'});
        }
       await Task.findOneAndDelete({_id: taskId}).then(()=>{
            return res.status(200).json({message: 'task deleted'});
        }).catch((err)=> {
            return res.status(400).json({message: 'cannot delete task' + err.message});
        })
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
}