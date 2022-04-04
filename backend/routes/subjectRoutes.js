const express = require('express');
const Subject = require('../controllers/student/subjectController');
const router = express.Router();


router.route('/')
      .get(Subject.subjectGET)
      .post(Subject.subjectPOST);

router.route("/:id")
      .get(Subject.subjectGetOneRecord)
      .patch(Subject.subjectPATCH)
      .delete(Subject.subjectDELETE);

module.exports = router;