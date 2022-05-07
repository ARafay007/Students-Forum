const initialState = {arrayObj: []}

const TeacherReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case 'TEACHER_GET':
            return {...state, arrayObj: [...payload]};

        case 'TEACHER_POST':
            return {...state, arrayObj: [...state.arrayObj, payload]};

        case 'TEACHER_PATCH':
            return {...state, arrayObj: [...state.arrayObj.map(el => {
                if(el._id === payload._id){ 
                    return payload;
                }
                return el;
            })]};

        case 'TEACHER_DELETE':
            return {...state, arrayObj: state.arrayObj.filter(el => el._id !== payload)};
            
        default:
            return state;
    }
};

export default TeacherReducer;