const express = require('express');
const config = require('config');
const colors = require('colors');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');

// Routes
const questions = require('./routes/questions');
const user = require('./routes/user');

const app = express();

connectDB()

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/questions', questions);
app.use('/users', user);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


const PORT = config.get('PORT') || 5000;


app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`.green.inverse);
});




