const initialState = {
  data: [],
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "AUTH_LOGIN_FULLFILLED":
      return { ...state, data: action.payload };
    case "AUTH_LOGIN_REJECTED":
      return { ...state, error: action.payload };
    case "AUTH_LOGOUT":
      return { ...state, data: null, error: null };
    default:
      return state;
  }
}
