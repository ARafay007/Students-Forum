import AppError from '../errorValidation/AppError';

const URL = 'http://localhost:3001/api';

export const teacherGET = () => async dispatch => {
    try{
        const resp = await fetch(`${URL}/teacher/`);
        const data = await resp.json();
        dispatch({type: 'TEACHER_GET', payload: data.data});
    }
    catch(err){
        console.log(`💥💥💥Error💥💥💥 ${err}`);
    }
};

export const teacherPOST = obj => async dispatch => {
    try{
        const resp = await fetch(`${URL}/teacher/`,{
            method: 'POST',
            body: obj
        });

        const data = await resp.json();
        dispatch({type: 'TEACHER_POST', payload: data.data.teacher});
    }
    catch(err){
        console.log(`💥💥💥Error💥💥💥 ${err}`);
    }
};

export const teacherPATCH = obj => async dispatch => {
    try{
        const resp = await fetch(`${URL}/teacher/${obj._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
        });
        
        const data = await resp.json();

        if(resp.status !== 200){
            throw new AppError(data.message.message, resp.status);
        }
        else if(resp.status === 200){
            dispatch({type: 'TEACHER_PATCH', payload: data.data});
        }
    }
    catch(err){
        console.log(`💥💥💥Error💥💥💥 ${err.message} ${err.status}`);
        return err.message;
    }
};

export const teacherDELETE = _id => async dispatch => {
    try{
        const resp = await fetch(`${URL}/teacher/${_id}`, {method: 'DELETE'});
        
        if(resp.status === 200){
            dispatch({type: 'TEACHER_DELETE', payload: _id});
        }
    }
    catch(err){
        console.log(`💥💥💥Error💥💥💥 ${err}`);
    }
};