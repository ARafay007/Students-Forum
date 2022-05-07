import { combineReducers } from "redux";
import SubjectReducer from "./subjectReducer";
import TeacherReducer from "./teacherReducer";

export const allReducers = combineReducers({
    SubjectReducer,
    TeacherReducer
});


