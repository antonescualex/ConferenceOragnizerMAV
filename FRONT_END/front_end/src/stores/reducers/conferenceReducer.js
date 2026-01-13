const initialState = {
  data: [],
  error: null,
};

export default function conferenceReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CONFERNCE_FULFILLED":
      return { ...state, data: action.payload, error: null };
    case "FETCH_CONFERNCE_REJECTED":
      return { ...state, error: action.payload };

    case "FETCH_CONFERENCES_FULFILLED":
      return { ...state, data: action.payload, error: null };
    case "FETCH_CONFERENCES_REJECTED":
      return { ...state, error: action.payload };

    
    case "CREATE_CONFERENCE_FULFILLED":
      return { ...state, data: action.payload, error: null };
    case "CREATE_CONFERENCE_REJECTED":
      return { ...state, error: action.payload };

    case "FETCH_CONFERENCE_ARTICLES_FULFILLED":
      return { ...state, data: action.payload, error: null };
    case "FETCH_CONFERENCE_ARTICLES_REJECTED":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
