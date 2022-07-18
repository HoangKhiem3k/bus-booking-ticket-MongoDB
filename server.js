const express = require('express');
const mongoose = require('mongoose');
const api = require('./routes/api');


const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vexere';
mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connected to ${mongoURI}`))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
app.use(express.json());
app.use('/', api);


const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));