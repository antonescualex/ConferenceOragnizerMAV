const initialState = {
  data: [],
  error: null,
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case "ARTICLES_FULLFILLED":
      return { ...state, data: action.payload };
    case "ARTICLES_REJECTED":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
