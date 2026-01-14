import { act } from "react";

const initialState = {
  data: [],
  selected: null,
  reviews: [],
  error: null,
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MY_ARTICLES_FULFILLED":
    case "FETCH_CONFERENCE_ARTICLES_FULFILLED":
      return { ...state, data: action.payload, error: null };

    case "FETCH_ARTICLE_FULFILLED":
      return { ...state, selected: action.payload, error: null };

    case "FETCH_REVIEWS_FULFILLED":
      return { ...state, reviews: action.payload, error: null };

    case "UPDATE_ARTICLE_FULFILLED":
      return { ...state, selected: action.payload, error: null };

    case "FETCH_MY_ARTICLES_REJECTED":
    case "FETCH_CONFERENCE_ARTICLES_REJECTED":
    case "FETCH_ARTICLE_REJECTED":
    case "FETCH_REVIEWS_REJECTED":
    case "UPDATE_ARTICLE_REJECTED":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
