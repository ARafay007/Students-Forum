const express = require('express');
const Subject = require('../controllers/student/subjectController');
const Auth = require('../controllers/authentication/authController');
const router = express.Router();


router.route('/')
      .get(Auth.protected, Subject.subjectGET)
      .post(Subject.subjectPOST);

router.route("/:id")
      .get(Subject.subjectGetOneRecord)
      .patch(Subject.subjectPATCH)
      .delete(Subject.subjectDELETE);

module.exports = router;