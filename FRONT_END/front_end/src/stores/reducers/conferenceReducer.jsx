const initialState = {
  data: {},
  error: null,
};

export default function conferenceReducer(state = initialState, action) {
  switch (action.type) {
    case "CONFERENCES_FULLFILLED":
      return { ...state, data: action.payload };
    case "CONFERENCES_REJECTED":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
