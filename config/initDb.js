const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const initDb = () =>{
    const options ={
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    let dbUri = process.env.MONGO_URI;

    mongoose.connect(dbUri, options);
    const connection = mongoose.connection;

    connection.on('connected', ()=>{
        console.log("COnnected to db ");
    })
    connection.on('error', (err)=> {
        console.log('cant connect',err);
    })
};

module.exports = initDb;