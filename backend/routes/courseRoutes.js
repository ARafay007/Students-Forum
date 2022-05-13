const express = require("express");
const Course = require("../controllers/student/courseController");
const router = express.Router();

router.route("/")
      .get(Course.courseGET)
      .post(Course.coursePOST);

module.exports = router;
