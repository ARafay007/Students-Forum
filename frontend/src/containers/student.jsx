import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateIfMounted } from "use-state-if-mounted";
import Select from "react-select";
import CitiesList from "../actions/cityAction";
import { subjectGET } from "../actions/subjectAction";
import { courseGET } from "../actions/courseAction";

const Student = () => {
  const [studentObj, setStudentObj] = useStateIfMounted({
    studentName: "",
    fatherName: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    city: "",
    admFee: 0,
    class: "",
    isActive: true,
    createdBy: "",
    createdAt: Date.now(),
    updatedBy: "",
    updatedAt: Date.now()
  });

  const allSubjectList = useSelector((state) => state.SubjectReducer.arrayObj);
  const courseList = useSelector((state) => state.CourseReducer.arrayObj);
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCities();
    dispatch(subjectGET());
    dispatch(courseGET());
  }, []);

  useEffect(() => {
    setSubjectsList(
      allSubjectList.map((el) => ({
        value: el.subjectName,
        label: el.subjectName,
        id: el._id
      }))
    );
  }, [allSubjectList]);

  const fetchCities = async () => {
    const list = await CitiesList();
    if (list) setCitiesList(list.map((el) => ({ value: el, label: el })));
  };

  const selectSubject = (e) => {
    setSelectedSubject(e.value);
    const teachers = courseList
      .filter(({ subjectId }) => subjectId.subjectName === e.value)
      .map(({ teacherId }) => ({
        value: teacherId.firstName,
        label: teacherId.firstName,
        id: teacherId._id
      }));
    setTeacherList(teachers);
  };

  const selectCourse = (e) => {
    setEnrolledCourse([
      ...enrolledCourse,
      { subject: selectedSubject, teacher: e.value }
    ]);
  };

  return (
    <div className="student">
      <div className="student__entry">
        <h2>ADD STUDENT</h2>
        <form
          // onSubmit={(e) => onHandleSubmit(e)}
          className="student__entry--colContainer"
        >
          <div className="student__col">
            <div>
              <label>Name *</label>
              <br />
              <input
                placeholder="Enter your name"
                // value={studentObj.studentName}
                // onChange={(e) => onFieldsChange("firstName", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Father Name *</label>
              <br />
              <input
                placeholder="Enter your last name"
                // value={studentObj.fatherName}
                // onChange={(e) => onFieldsChange("lastName", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Phone *</label>
              <br />
              <input
                maxLength="11"
                placeholder="Enter your phone"
                // value={studentObj.phone}
                // onChange={(e) => onFieldsChange("phone", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Gender *</label>
              <br />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="male"
                value="male"
                className="radioButtonField"
                // onChange={(e) => onFieldsChange("gender", e)}
                name="gender"
              />

              <label htmlFor="female" className="labelFemale">
                Female
              </label>
              <input
                type="radio"
                id="female"
                value="female"
                className="radioButtonField"
                // onChange={(e) => onFieldsChange("gender", e)}
                name="gender"
              />
            </div>
            <div className="student__entry--addButton">
              <input
                type="submit"
                value="Add student"
                className="button button__add"
              />
            </div>
          </div>
          <div className="student__col">
            <div>
              <label>Address *</label>
              <br />
              <input
                placeholder="Enter your address"
                // value={studentObj.address}
                // onChange={(e) => onFieldsChange("address", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Email *</label>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                // value={studentObj.email}
                // onChange={(e) => onFieldsChange("email", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>City *</label>
              <br />
              <Select
                value={citiesList.value}
                options={citiesList}
                className="selectFields"
                // onChange={(e) => onFieldsChange("city", e)}
              />
            </div>
            <div>
              <label>Is Active:</label>
              <input
                type="checkbox"
                value={studentObj.isActive}
                // onChange={(e) => onFieldsChange("isActive", e)}
                className="checkBoxField"
              />
            </div>
          </div>
          <div className="student__col">
            <div>
              <label>Admission Fee *</label>
              <br />
              <input
                placeholder="Enter admission fee"
                // value={studentObj.phone}
                // onChange={(e) => onFieldsChange("phone", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Class</label>
              <br />
              <input
                placeholder="Enter class"
                // value={studentObj.phone}
                // onChange={(e) => onFieldsChange("phone", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Select Subjects *</label>
              <br />
              <Select
                value={subjectsList.value}
                options={subjectsList}
                className="selectFields"
                onChange={(e) => selectSubject(e)}
              />
            </div>
            <div>
              <label>Select Teacher *</label>
              <br />
              <Select
                value={teacherList.value}
                options={teacherList}
                className="selectFields"
                onChange={(e) => selectCourse(e)}
              />
            </div>
          </div>
        </form>
      </div>
      {enrolledCourse.length === 0 ? "" : <div></div>}
    </div>
  );
};

export default Student;
