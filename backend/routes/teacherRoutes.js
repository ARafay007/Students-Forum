const express = require("express");
const Teacher = require("../controllers/teacher/teacherController");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./upload/");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage });

router.route("/").get(Teacher.teacherGET).post(Teacher.teacherPOST);
// .post(upload.single('myFile'), Teacher.teacherPOST);

// .post( Teacher.teacherPOST);

router
  .route("/:id")
  .get(Teacher.teacherGetOneRecord)
  .patch(Teacher.teacherPATCH)
  .delete(Teacher.teacherDELETE);

module.exports = router;
