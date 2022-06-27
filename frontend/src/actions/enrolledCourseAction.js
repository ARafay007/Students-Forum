const jsCookie = require('js-cookie');
const URL = "http://localhost:3001/api";

export const enrolledCourseGET = () => async dispatch => {
    try{
        const resp = await fetch(`${URL}/enrolledCourse`, {
            method: "GET",
            headers: {
                'Content-type': 'Application/json',
                'authorization': `Bearer ${jsCookie.get('jwt')}`
            }
        })

        const data = await resp.json();

        if(resp.status !== 200){
            throw data.message;
        }


        dispatch({type: 'ENROLLED_COURSE_GET', payload: data.allStudentEnrolled});
    }
    catch(err){
        console.log(err);
    }
}

export const enrolledCoursePOST = (obj) => async dispatch => {
    try{
        const resp = await fetch(`${URL}/enrolledCourse`, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
                'authorization': `Bearer ${jsCookie.get('jwt')}`
            },
            body: JSON.stringify(obj)
        });

        const data = await resp.json();

        if(resp.status !== 200){
            throw data.message;
        }

        console.log(data);
        // dispatch({type: 'ENROLLED_COURSE_POST', payload: data});
    }
    catch(err){
        console.log(err);
    }
}