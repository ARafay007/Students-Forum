const express = require("express");
const Course = require("../controllers/student/courseController");
const router = express.Router();

router.route("/").post(Course.coursePOST);

module.exports = router;
