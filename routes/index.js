var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var types = mongoose.Types;
var StudentModel = mongoose.model('Students');

/* GET home page. */
router
.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router
.get('/student', function(req, res, next) {
  StudentModel
  .find({})
  .exec(function(err, data) {
    res.json(data);
  })
})
.post('/student', function(req, res, next) {
  var data = req.body;

  if(data) {
    var student = new StudentModel({
      name: data.name,
      dob: new Date(data.dob),
      school: data.school,
      level: data.level,
      country: data.country,
      satScore: data.score,
      collegeIds: []
    });

    student.save(function(err) {
      if(err) {
        res.status(500);
        res.json({
          message: 'Saving failed',
          success: false
        });
      } else {
        res.json({
          message: 'Save successful',
          success: true
        })
      }
    });
  }
})
.put('/student', function(req, res, next) {
  var data = req.body;
  console.log(data);
  if(data) {
    StudentModel
    .update({
      "_id": types.ObjectId(data.id)
    }, {
      name: data.name,
      dob: new Date(data.dob),
      school: data.school,
      level: data.level,
      country: data.country,
      satScore: data.score,
      college: data.college || []
    }, { upsert: true }, function(err, model) {
      if(err) {
        console.log(err);
        res.status(500);
        res.json({
          message: 'Update failed',
          success: false
        });
      } else {
        res.json({
          message: 'Updated successful',
          success: true
        })
      }
    })
  }
})
.delete('/student/:studentId', function(req, res, next) {
  var id = req.param('studentId');
  if(id) {
    StudentModel.find({
      _id: types.ObjectId(id)
    })
    .remove()
    .exec(function(err, cb) {
      if(err) {
        console.log(err);
        res.status(500);
        res.json({
          success: false,
          message: 'Error deleting student detail'
        });
      } else {
        res.json({
          success: true,
          message: 'Deleted successfully'
        });
      }
    })
  } else {
    res.status(400);
    res.json({ 
      success: false,
      message: 'Please provide the student id'
    });
  }
})

module.exports = router;
