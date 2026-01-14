import { req } from "../actions/authentificationAction";

export function fetchArticles(id) {
  return {
    type: "FETCH_MY_ARTICLES",
    payload: req(`/authors/${id}/articles`),
  };
}

export function fetchConferenceArticles(confId) {
  return {
    type: "FETCH_CONFERENCE_ARTICLES",
    payload: req(`/conferences/${confId}/articles`),
  };
}

export function fetchArticleBId(id) {
  return {
    type: "FETCH_ARTICLE",
    payload: req(`/articles/${id}`),
  };
}

export function fetchArticleReviews(artId) {
  return {
    type: "FETCH_REVIEWS",
    payload: req(`/articles/${artId}/reviews`),
  };
}

export function submitArticleAndAssign({ title, conferenceId, authorId }) {
  const work = async () => {
    const created = await req("/article", {
      method: "POST",
      body: JSON.stringify({
        title,
        conferenceId,
        authorId,
        status: "SUBMITTED",
        version: 1,
      }),
    });

    const article = created.data || created;

    const reviewers = await req("/reviewers");
    const chosen = [...reviewers].sort(() => Math.random() - 0.5).slice(0, 2);

    for (const r of chosen) {
      await req("/review", {
        method: "POST",
        body: JSON.stringify({
          articleId: article.id,
          reviewerId: r.id,
          decision: "PENDING",
          comments: "",
          grade: null,
        }),
      });
    }

    return req(`/authors/${authorId}/articles`);
  };

  return { type: "FETCH_MY_ARTICLES", payload: work() };
}

export function updateArticle(artId, payload) {
  return {
    type: "UPDATE_ARTICLE",
    payload: req(`/articles/${artId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  };
}
