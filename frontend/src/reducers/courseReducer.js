const initialState = { arrayObj: [] };

const CourseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "COURSE_GET":
      return { ...state, arrayObj: [...payload] };

    case "COURSE_POST":
      return { ...state, arrayObj: [...state.arrayObj, payload] };

    default:
      return state;
  }
};

export default CourseReducer;
