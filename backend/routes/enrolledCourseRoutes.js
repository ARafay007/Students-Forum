const express = require('express');
const enrolledCourse = require('../controllers/student/studentEnrolledController');
const router = express.Router();

router.route('/')
      .get(enrolledCourse.studentEnrolledGET)
      .post(enrolledCourse.studentEnrolledPOST);

module.exports = router;