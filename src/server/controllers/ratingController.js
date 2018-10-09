const RatingsData = require('../schema/ratingSchema.js');

module.exports = {
  getRatings: (req, res) => {
    RatingsData.find({}, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      return res.send(data);
    });
  },
  addRating: (req, res) => {
    RatingsData.create(req.body, (err, newDoc) => {
      if (err) {
        res.setStatus(400).send(err);
      }
      res.json(newDoc);
    });
  },
  searchActivityRating: (req, res) => {

  }
}