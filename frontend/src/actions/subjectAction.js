import jsCookie from 'js-cookie';
const URL = 'http://localhost:3001/api';

export const subjectGET = () => async dispatch => {
    try{
        const resp= await fetch(`${URL}/subject/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${jsCookie.get('jwt')}`
            }
        });
        const data = await resp.json();

        if(resp.status !== 200){
            throw data.message;
        }

        dispatch({type: 'SUBJECT_GET', payload: data.allSubjects});
    }
    catch(err){
        console.log(`💥💥💥Error💥💥💥 ${err}`);
    }
}

export const subjectPOST = (subjectObj) => async dispatch => {
    try{
        const respone = await fetch(`${URL}/subject/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(subjectObj)
        });
        const data = await respone.json();
        dispatch({type: 'SUBJECT_POST', payload: data.subject});
    }
    catch(err){
        console.log(`💥💥💥Error💥💥💥 ${err}`);
    }
};

export const subjectPATCH = (_id, subjectObj) => async dispatch => {
    try{
        await fetch(`${URL}/subject/${_id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(subjectObj)
        });
    
        dispatch({type: 'SUBJECT_PATCH', payload: {_id, subjectObj}});
    }
    catch(err){
        console.log(`💥💥💥Error💥💥💥 ${err}`);
    }
};

export const subjectDELETE = _id => async dispatch => {
    try{
        await fetch (`${URL}/subject/${_id}`, {method: 'DELETE'});
    
        dispatch({type: 'SUBJECT_DELETE', payload: _id});
    }
    catch(err){
        console.log(`💥💥💥Error💥💥💥 ${err}`);
    }
}