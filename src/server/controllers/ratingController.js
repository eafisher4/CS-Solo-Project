const RatingsData = require('../schema/ratingSchema.js');

module.exports = {
  getRatings: (req, res) => {
    RatingsData.find({}, (err, data) => {
      if (err) {
        return res.send(err);
      }
      return res.send(data);
    });
  },
  addRating: (req, res) => {
    RatingsData.create(req.body, (err, newDoc) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(newDoc);
    });
  },
  searchActivityRating: (req, res) => {
    RatingsData.find({}, (err, data) => {
      if (err) {
        return res.send(err);
      }
      return res.send(data);
    });
  },
};
