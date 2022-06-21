const URL = "http://localhost:3001/api";

const studentGET = () => async dispatch => {
    try{
        const resp = await fetch(`${URL}/student`, {
            method: "GET",
            headers: {'Content-Type': 'Application/json'},
        });

        if(resp.status === 200){
            const data = await resp.json();
            console.log(data);
            dispatch({type: 'STUDENT_GET', payload: data})
        }
    }
    catch(err){
        console.log(err);
    }
}

const studentPOST = (obj) => async dispatch => {
    try{
        const resp = await fetch(`${URL}/student`, {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify(obj)
        });

        if(resp.status === 200){
            const data = await resp.json();
            console.log(data);
            // dispatch({type: 'STUDENT_POST', payload: data.data});
        }
    }
    catch(err){
        console.log(err);
    }
}