const initialState = {arrayObj: []};

const SubjectReducer = (state=initialState, {type, payload}) => {
    switch(type){
        case 'SUBJECT_GET':
            return {...state, arrayObj: [...payload]};

        case 'SUBJECT_POST':
            return {...state, arrayObj: [...state.arrayObj, payload]};
            
        case 'SUBJECT_PATCH':
            return {...state, arrayObj: [...state.arrayObj.map(obj => {
                if(obj._id === payload._id){ 
                    obj.subjectName = payload.subjectObj.subjectName;
                    obj.isActive = payload.subjectObj.isActive;
                    obj.updatedBy = payload.subjectObj.updatedBy;
                }
                return obj;
            })]};
        
        case 'SUBJECT_DELETE':
            return {...state, arrayObj: [...state.arrayObj.filter(obj => obj._id !== payload)]};

        default: 
            return state;
    }
};

export default SubjectReducer;