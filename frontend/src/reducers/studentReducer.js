const initialState = { arrayObj: [] };

const studentReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case 'STUDENT_GET':
            return {...state, arrayObj: [...payload]};
            
        case 'STUDENT_POST':
            return {...state, arrayObj: [...state.arrayObj, ...payload]};

        default:
            return state;
    }
}

export default studentReducer;