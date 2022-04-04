const express = require('express');
const Teacher = require('../controllers/teacher/teacherController');
const router = express.Router();

router.route('/')
      .get(Teacher.teacherGET)
      .post(Teacher.teacherPOST);

router.route('/:id')
      .get(Teacher.teacherGetOneRecord)
      .patch(Teacher.teacherPATCH)
      .delete(Teacher.teacherDELETE);

module.exports = router;