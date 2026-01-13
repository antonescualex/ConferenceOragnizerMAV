import { combineReducers } from "redux";
import authReducer from "./authReducer";
import conferenceReducer from "./conferenceReducer";
import articleReducer from "./articleReducer";
import reviewReducer from "./reviewReducer";

export default combineReducers({
  auth: authReducer,
  conferences: conferenceReducer,
  articles: articleReducer,
  reviews: reviewReducer,
});
