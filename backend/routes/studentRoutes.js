const express = require('express');
const Student = require('../controllers/student/studentController');
const router = express.Router();

router.route('/')
      .get(Student.studentGET)
      .post(Student.studentPOST);

router.route('/:id')
      .get(Student.studentGetOneRecord)
      .patch(Student.studentPATCH)
      .delete(Student.studentDELETE);

module.exports = router;