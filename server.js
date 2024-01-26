const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const initDb = require('./config/initDb.js');
const initRoutes = require('./routes/index.js');
const logger = require('morgan');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
let PORT = process.env.PORT;
initDb();
initRoutes(app);

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});


