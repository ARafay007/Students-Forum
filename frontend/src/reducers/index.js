import { combineReducers } from "redux";
import SubjectReducer from "./subjectReducer";
import TeacherReducer from "./teacherReducer";
import CourseReducer from "./courseReducer";
import StudentReducer from "./studentReducer";
import EnrolledCourseReducer from "./EnrolledCourseReducer";

export const allReducers = combineReducers({
    SubjectReducer,
    TeacherReducer,
    CourseReducer,
    StudentReducer,
    EnrolledCourseReducer
});


