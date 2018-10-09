const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const ratingController = require('./controllers/ratingController.js');

//config
require('dotenv').config();
app.use(bodyparser.json());

app.get('/ratings', ratingController.getRatings);
app.post('/newDay', ratingController.addRating);
app.get('/searchActivity', ratingController.searchActivityRating);
app.use(express.static(__dirname + '/../../dist')); // normally points to index.js

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) console.log(err)
  else console.log("connected to database")
})

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000....');
});
