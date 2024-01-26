
const taskRouter = require('./taskRoutes')
const initRoutes = (app) =>{
    app.use("/api/v1/task/", taskRouter);
}   
module.exports = initRoutes;