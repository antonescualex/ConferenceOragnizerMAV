const initialState = {
  personalReviews: [],
  articleReviews: [],
  error: null,
};

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case "PERSONAL_REVIEWS_FULFILLED":
      return { ...state, personalReviews: action.payload };
    case "ARTICLE_REVIEWS_FULFILLED":
      return { ...state, articleReviews: action.payload };
    case "PERSONAL_REVIEWS_REJECTED":
    case "ARTICLE_REVIEWS_REJECTED":
    case "UPDATE_REVIEW_REJECTED":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
