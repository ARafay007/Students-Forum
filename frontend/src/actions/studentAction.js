const jsCookie = require('js-cookie');
const URL = "http://localhost:3001/api";

export const studentGET = () => async dispatch => {
    try{
        const resp = await fetch(`${URL}/student`, {
            method: "GET",
            headers: {
                'Content-Type': 'Application/json',
                'authorization': `Bearer ${jsCookie.get('jwt')}`
            },
        });

        if(resp.status === 200){
            const data = await resp.json();
            console.log(data);
            // dispatch({type: 'STUDENT_GET', payload: data.data})
        }
    }
    catch(err){
        console.log(err);
    }
}

export const studentPOST = (obj) => async dispatch => {
    try{
        const resp = await fetch(`${URL}/student`, {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify(obj)
        });

        const data = await resp.json();

        if(resp.status !== 200){
            throw data.message;
        }

        console.log(data);
        // dispatch({type: 'STUDENT_POST', payload: data.data});
        return data.std;
    }
    catch(err){
        console.log(err);
    }
}