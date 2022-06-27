const initialState = { arrayObj: [] };

const EnrolledCourseReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case 'ENROLLED_COURSE_GET':
            return {...state, arrayObj: [...payload]};

        case 'ENROLLED_COURSE_POST':
            return {...state, arrayObj: [...state.arrayObj, payload]};

        default:
            return state;
    }
};

export default EnrolledCourseReducer;