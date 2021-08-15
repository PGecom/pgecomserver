const express = require('express');
const router = express.Router();
const { log } = console;

const coachModel = require('../models/coach');

// Initiate functions
const fetchAllCoaches = function(req, res, next) {
  const { id }= req.query;

  if (id) {
    return next();
  }

  coachModel.find({ }, (error, docs) => {
    if (error) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    return res.json(docs);
  });
}

const findCoachById = function(req, res, next) {
  const { id } = req.query;

  coachModel.findOne({ _id: id }, (error, docs) => {
    if (error) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    return res.json(docs);
  });
  
}

const addCoach = function(req, res, next) {
  const coach = new coachModel(req.body);
  coach.save((error, docs) => {
    if (error) {
      return  res.status(500).json({
        message: 'Internal Server Error'
      })
    }
    return res.json(docs);
  });
}

const deleteCoachById = function(req, res, next) {
  const { id } = req.query;
  coachModel.deleteOne({ _id: id }, req.body, (error, docs) => {
    if (error) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    return res.json(docs);
  });
}

const updateCoachById = function(req, res, next) {
  const { id } = req.query;
  coachModel.findOneAndUpdate({ _id: id }, req.body, (error, docs) => {
    if (error) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    if (!docs) {
      return res.status(404).json({
        message: 'Coach by have been deleted. Check ID again'
      })
    }

    let coach = req.body;
    coach._id = docs._id

    return res.json(coach);
  });
}

/* Coach Route. */
router.route('/')
  .get(fetchAllCoaches)
  .get(findCoachById)
  .put(updateCoachById)
  .post(addCoach)
  .delete(deleteCoachById);

module.exports = router;
