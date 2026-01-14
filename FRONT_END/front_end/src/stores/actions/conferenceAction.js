import { req } from "../actions/authAction";

export function fetchConference() {
  return {
    type: "FETCH_CONFERENCE",
    payload: req("/conferences"),
  };
}

export function fetchOrganiserConferences(id) {
  return {
    type: "FETCH_CONFERENCES",
    payload: req(`/organisers/${id}/conferences`),
  };
}

export function createConference(payload) {
  return {
    type: "CREATE_CONFERENCE",
    payload: req("/conference", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  };
}

export function fetchConferenceArticles(conferenceId) {
  return {
    type: "FETCH_CONFERENCE_ARTICLES",
    payload: req(`/conferences/${conferenceId}/articles`),
  };
}
