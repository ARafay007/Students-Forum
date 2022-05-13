import AppError from "../errorValidation/AppError";

const URL = "http://localhost:3001/api";

export const courseGET = () => async (dispatch) => {
  try{
    const resp = await fetch(`${URL}/course`, {
      method: 'GET',
      headers: {'Content-Type': 'Application/json'}
    })

    if(resp.status === 200){
      const data = await resp.json();
      dispatch({type: 'COURSE_GET', payload: data.data});
    }
  }
  catch(err){
    console.log("💥💥💥ERROR💥💥💥" + err);
  }
}

export const coursePOST = (arrayObj) => async (dispatch) => {
  try {
    const resp = await fetch(`${URL}/course`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arrayObj)
    });

    
    if (resp.status === 200) {
      const data = await resp.json();
      dispatch({ type: "COURSE_POST", payload: data.data });
    } else {
      throw new AppError("backend Error", resp.status);
    }
  } catch (err) {
    console.log("💥💥💥ERROR💥💥💥" + err);
  }
};
