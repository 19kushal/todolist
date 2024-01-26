const  todoController = require( '../controllers/todoController.js');

const taskRouter = require('express').Router();
taskRouter.post('/add', todoController.addTask);
taskRouter.put('/update/:id', todoController.updateTask);
taskRouter.get('/all', todoController.getAllTasks);
taskRouter.get('/get/:id', todoController.getTask);
taskRouter.delete('/delete/:id', todoController.deleteTask);
taskRouter.post('/change/status/:id', todoController.markComplete);
module.exports= taskRouter;