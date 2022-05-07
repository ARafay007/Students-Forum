import AppError from "../errorValidation/AppError";

const URL = "http://localhost:3001/api";

export const coursePOST = (obj) => async (dispatch) => {
  try {
    const resp = await fetch(`${URL}/course`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    });

    const data = await resp.json();

    if (resp.status === 200) {
      console.log(data);
      dispatch({ type: "COURSE_POST", payload: data.data });
    } else {
      throw new AppError(data.message, resp.status);
    }
  } catch (err) {
    console.log("💥💥💥ERROR💥💥💥" + err);
  }
};
