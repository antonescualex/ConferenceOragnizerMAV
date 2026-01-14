const initialState = {
  data: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "AUTH_LOGIN_FULFILLED":
      return { ...state, data: action.payload };
    case "AUTH_LOGIN_REJECTED":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
