const initialState = {
  data: [],
  error: null,
  conferenceArticle: [],
  conferenceReviewers: [],
};

export default function conferenceReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CONFERENCE_FULFILLED":
    case "FETCH_CONFERENCES_FULFILLED":
      return { ...state, data: action.payload, error: null };

    case "CREATE_CONFERENCE_FULFILLED":
      return {
        ...state,
        data: [...state.data, action.payload.data || action.payload],
        error: null,
      };

    case "FETCH_CONFERENCE_ARTICLES_FULFILLED":
      return {
        ...state,
        conferenceArticle: action.payload.reviewers || action.payload,
        error: null,
      };

    case "FETCH_CONFERENCE_REVIEWERS_FULFILLED":
    case "SET_CONFERENCE_REVIEWERS_FULFILLED":
      return {
        ...state,
        conferenceReviewers: action.payload.reviewers || action.payload,
        error: null,
      };

    case "FETCH_CONFERENCE_REJECTED":
    case "FETCH_CONFERENCES_REJECTED":
    case "FETCH_CONFERENCE_ARTICLES_REJECTED":
    case "CREATE_CONFERENCE_REJECTED":
    case "FETCH_CONFERENCE_REVIEWERS_REJECTED":
    case "SET_CONFERENCE_REVIEWERS_REJECTED":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
