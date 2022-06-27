import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useStateIfMounted } from "use-state-if-mounted";
import Select from "react-select";
import CitiesList from "../actions/cityAction";
import {courseGET} from '../actions/courseAction';
import { subjectGET } from "../actions/subjectAction";
import { studentGET, studentPOST } from "../actions/studentAction";
import { enrolledCourseGET, enrolledCoursePOST } from "../actions/enrolledCourseAction";
import ErrorPopup from "../components/errorPopup";
import CheckValidation from "../errorValidation/checkValidation";

const Student = () => {
  const [studentObj, setStudentObj] = useStateIfMounted({
    studentName: {value: '', required: true},
    fatherName: {value: '', required: true},
    gender: {value: '', required: true},
    phone: {value: '', required: true},
    address: {value: '', required: true},
    email: {value: '', required: false},
    city: {value: '', required: true},
    admFee: {value: '', required: true},
    class: {value: '', required: false},
    isActive: {value: '', required: true},
    createdBy: {value: '', required: false},
    createdAt: {value: Date.now(), required: false},
    updatedBy: {value: '', required: false},
    updatedAt: {value: Date.now(), required: false}
  });

  const courseList = useSelector(state => state.CourseReducer.arrayObj);
  const allSubjectList = useSelector(state => state.SubjectReducer.arrayObj);
  const getAllStudents = useSelector(state => state.StudentReducer.arrayObj);
  const getEnrolledCourse = useSelector(state => state.EnrolledCourseReducer.arrayObj);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [citiesList, setCitiesList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectFee, setSubjectFee] = useState('');
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const dispatch = useDispatch();
console.log(getEnrolledCourse);
  useEffect(() => {
    fetchCities();
    dispatch(courseGET());
    dispatch(subjectGET());
    dispatch(studentGET());
    dispatch(enrolledCourseGET());
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
      .map(({ _id, teacherId }) => ({
        value: teacherId.firstName,
        label: teacherId.firstName,
        _id
      }));
    setTeacherList(teachers);
  };

  const enteredSubjectFee = e => {setSubjectFee(e.target.value)};

  const selectCourse = (e) => {
    console.log(e);
    setEnrolledCourse([
      ...enrolledCourse,
      { subjectFee: {value: subjectFee, required: true}, subject: {value: selectedSubject, required: true}, teacher: {value: e.value, required: true}, courseId: {value: e._id, required: true} }
    ]);
  };

  const removeCourse = (course) => {
    let removedCourse = enrolledCourse;

    setEnrolledCourse(removedCourse
      .filter(el => el.subject.value === course.subject.value && el.teacher.value === course.teacher.value ? '' : (el))
    );
  }

  const printSelectedCourses = () => {
    return enrolledCourse.map((el, index) => (
      <tr key={index}>
        <td className="td">{el.subject.value}</td>
        <td className="td">{el.teacher.value}</td>
        <td className="td">{el.subjectFee.value}</td>
        <td className="td">
          <button title="Delete" className="button__tableAction" onClick={() => removeCourse(el)}>
            <img src='./delete.png' alt="Delete Icon" className="table__action--icons" />
          </button>
        </td>
      </tr>
    ));
  };

  const onFieldsChange = (fieldName, e) => {
    if(fieldName === 'city'){
      setStudentObj(prevState => ({
        ...prevState,
        [fieldName]: {value: e.value, required: [fieldName].required}
      }));
    }
    else if(fieldName === 'isActive'){
      setStudentObj(prevState => ({...prevState, 
        [fieldName]: {value: e.target.checked, required: studentObj[fieldName].required}
      }));
    }
    else{
      setStudentObj(prevState => ({
        ...prevState,
        [fieldName]: {
          value: e.target.value, 
          required: studentObj[fieldName].required
        }
      }));
    }
  };

  const checkValidation = (openErrorPopup = false, backendError = false, errorMsg = '') => {
    const obj = {...studentObj, enrolledCourse};
    obj.createdBy = {value: 'Admin', required: false};
    const {returnValue, openPopup, msg} = CheckValidation(openErrorPopup, backendError, obj, errorMsg);
    setShowErrorPopup(openPopup);
    setErrorMsg(msg);
    return returnValue;
  };

  const onHandleSubmit = async e => {
    e.preventDefault();
    if(checkValidation(true, false, "Please fill all the required fields!")){

      const student = {
        studentName: studentObj.studentName.value,
        fatherName: studentObj.fatherName.value,
        gender: studentObj.gender.value,
        phone: studentObj.phone.value,
        address: studentObj.address.value,
        email: studentObj.email.value,
        city: studentObj.city.value,
        admFee: studentObj.admFee.value,
        class: studentObj.class.value,
        isActive: studentObj.isActive.value,
        createdAt: studentObj.createdAt.value,
        createdBy: studentObj.createdBy.value,
      }

      const newStd = await dispatch(studentPOST(student));

      const enrollCourse = enrolledCourse.map(el => ({studentId: newStd._id, courseId: el.courseId.value, subjectFee: el.subjectFee.value}));

      dispatch(enrolledCoursePOST(enrollCourse)) ;
    }
  };

  return (
    <div className="student">
      {showErrorPopup && <ErrorPopup errorMsg={errorMsg} errorFunction={checkValidation} />}
      <div className="student__entry">
        <h2>ADD STUDENT</h2>
        <form
          onSubmit={(e) => onHandleSubmit(e)}
          className="student__entry--colContainer"
        >
          <div className="student__col">
            <div>
              <label>Name *</label>
              <br />
              <input
                placeholder="Enter your name"
                value={studentObj.studentName.value}
                onChange={(e) => onFieldsChange("studentName", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Father Name *</label>
              <br />
              <input
                placeholder="Enter your last name"
                value={studentObj.fatherName.value}
                onChange={(e) => onFieldsChange("fatherName", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Phone *</label>
              <br />
              <input
                maxLength="11"
                placeholder="Enter your phone"
                value={studentObj.phone.value}
                onChange={(e) => onFieldsChange("phone", e)}
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
                onChange={(e) => onFieldsChange("gender", e)}
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
                onChange={(e) => onFieldsChange("gender", e)}
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
                value={studentObj.address.value}
                onChange={(e) => onFieldsChange("address", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Email *</label>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                value={studentObj.email.value}
                onChange={(e) => onFieldsChange("email", e)}
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
                onChange={(e) => onFieldsChange("city", e)}
              />
            </div>
            <div>
              <label>Class</label>
              <br />
              <input
                placeholder="Enter class"
                value={studentObj.class.value}
                onChange={(e) => onFieldsChange("class", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Is Active:</label>
              <input
                type="checkbox"
                value={studentObj.isActive}
                onChange={(e) => onFieldsChange("isActive", e)}
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
                value={studentObj.admFee.value}
                onChange={(e) => onFieldsChange("admFee", e)}
                className="textField updateTextFields"
              />
            </div>
            <div>
              <label>Subject Fee</label>
              <br />
              <input type='number'
                placeholder="Enter Subject Fee"
                value={subjectFee}
                onChange={enteredSubjectFee}
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
      {
        enrolledCourse.length === 0 ? '' :
        <div>
          <h2>Selected Courses</h2>
          <table className="table">
            <thead>
              <tr>
                <th className="th">Subject</th>
                <th className="th">Teacher</th>
                <th className="th">Subject Fee</th>
                <th className="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {printSelectedCourses()}
            </tbody>
          </table>
        </div> 
      }
    </div>);
};

export default Student;
