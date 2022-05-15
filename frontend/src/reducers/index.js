import { combineReducers } from "redux";
import SubjectReducer from "./subjectReducer";
import TeacherReducer from "./teacherReducer";
import CourseReducer from "./courseReducer";

export const allReducers = combineReducers({
    SubjectReducer,
    TeacherReducer,
    CourseReducer,
});


