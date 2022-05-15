const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// dotenv.config({path: './config.env'});
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(/<PASSWORD>/g, process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log('DB connection successful');
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App running at Port ${port}...`)
});
