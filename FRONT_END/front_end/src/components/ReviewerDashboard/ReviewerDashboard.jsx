import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { req } from "../../stores/actions/authAction";
import "./ReviewerDashboard.css";

export default function ReviewerDashboard() {
  const reviewer = useSelector((state) => state.auth.data);
  const [conferences, setConferences] = useState([]);
  const [selectedConferenceId, setSelectedConferenceId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [mode, setMode] = useState("list");
  const [loading, setLoading] = useState(false);
  const [reviewDrafts, setReviewDrafts] = useState({});
  const [activeReviewArticleId, setActiveReviewArticleId] = useState(null);

  const reviewerId = reviewer?.id;

  useEffect(() => {
    if (!reviewerId) return;
    setLoading(true);
    req(`/reviewers/${reviewerId}/conferences`)
      .then((data) => {
        setConferences(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching conferences:", err);
        setConferences([]);
      })
      .finally(() => setLoading(false));
  }, [reviewerId]);

  useEffect(() => {
    if (!selectedConferenceId || !reviewerId) return;
    setLoading(true);
    req(`/reviewers/${reviewerId}/conferences/${selectedConferenceId}/articles`)
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [selectedConferenceId, reviewerId]);

  useEffect(() => {
    if (!selectedConferenceId || !reviewerId) return;
    setLoading(true);
    req(`/reviewers/${reviewerId}/conferences/${selectedConferenceId}/reviews`)
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, [selectedConferenceId, reviewerId]);

  const selectedConference = conferences.find(
    (c) => c.id === selectedConferenceId
  );

  const reviewByArticleId = reviews.reduce((acc, review) => {
    const articleId = review.articleId || review.article?.id;
    if (articleId) acc[articleId] = review;
    return acc;
  }, {});

  function onSelectConference(id) {
    setSelectedConferenceId(id);
    setMode("details");
  }

  function onBack() {
    setMode("list");
    setSelectedConferenceId(null);
    setActiveReviewArticleId(null);
  }

  function onEditReview(articleId) {
    const existing = reviewByArticleId[articleId];
    setReviewDrafts((prev) => ({
      ...prev,
      [articleId]: {
        decision: existing?.decision || "PENDING",
        comments: existing?.comments || "",
      },
    }));
    setActiveReviewArticleId(articleId);
  }

  function onCancelReview() {
    setActiveReviewArticleId(null);
  }

  function onDraftChange(articleId, field, value) {
    setReviewDrafts((prev) => ({
      ...prev,
      [articleId]: {
        ...(prev[articleId] || {}),
        [field]: value,
      },
    }));
  }

  async function onSubmitReview(articleId) {
    if (!reviewerId) return;
    const draft = reviewDrafts[articleId];
    if (!draft?.decision) return;

    setLoading(true);
    try {
      const existing = reviewByArticleId[articleId];
      if (existing) {
        await req(`/reviews/${existing.id}`, {
          method: "PUT",
          body: JSON.stringify({
            decision: draft.decision,
            comments: draft.comments,
          }),
        });
      } else {
        await req("/review", {
          method: "POST",
          body: JSON.stringify({
            reviewerId,
            articleId,
            decision: draft.decision,
            comments: draft.comments,
          }),
        });
      }

      const updated = await req(
        `/reviewers/${reviewerId}/conferences/${selectedConferenceId}/reviews`
      );
      setReviews(Array.isArray(updated) ? updated : []);
      setActiveReviewArticleId(null);
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setLoading(false);
    }
  }

  if (mode === "list") {
    return (
      <div className="dash">
        <div className="topbar">
          <div className="topbar-welcome">
            <div className="topbar-title">
              Bine ai venit, {reviewer?.fullName || "Reviewer"} | Reviewer
            </div>
          </div>
          <div className="topbar-email">
            {reviewer?.email || "email@exemplu.ro"}
          </div>
        </div>

        <div className="main">
          <div className="panel">
            <div className="panel-head">
              <h2>Conferintele existente</h2>
              <span className="badge">{conferences.length}</span>
            </div>

            {loading ? (
              <p className="empty-state">Se incarca...</p>
            ) : conferences.length === 0 ? (
              <p className="empty-state">Nu sunt conferinte disponibile.</p>
            ) : (
              <div className="grid">
                {conferences.map((conf) => (
                  <div
                    key={conf.id}
                    className="card"
                    onClick={() => onSelectConference(conf.id)}
                  >
                    <h3>{conf.name}</h3>
                    <p className="card-desc">{conf.description}</p>
                    <div className="card-meta">
                      <span>
                        📅{" "}
                        {new Date(conf.startDate).toLocaleDateString("ro-RO")}
                      </span>
                      <span>→</span>
                      <span>
                        {new Date(conf.endDate).toLocaleDateString("ro-RO")}
                      </span>
                    </div>
                    <button className="btn-primary">Selectează</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dash">
      <div className="topbar">
        <button className="btn-back" onClick={onBack}>
          ← Inapoi
        </button>
        <div className="topbar-title">{selectedConference?.name}</div>
        <div className="topbar-sub">{selectedConference?.description}</div>
      </div>

      <div className="main">
        {}
        <div className="panel">
          <div className="panel-head">
            <h2>Articole valabile pentru Review</h2>
            <span className="badge">{articles.length}</span>
          </div>

          {loading ? (
            <p className="empty-state">Se încarca...</p>
          ) : articles.length === 0 ? (
            <p className="empty-state">
              Nu sunt articole disponibile pentru review.
            </p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Titlu</th>
                    <th>Autor</th>
                    <th>Status</th>
                    <th>Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <Fragment key={article.id}>
                      <tr>
                        <td>{article.title}</td>
                        <td>{article.author?.fullName || "Necunoscut"}</td>
                        <td>
                          <span className="status pending">
                            {reviewByArticleId[article.id]?.decision ||
                              "PENDING"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-sm"
                            onClick={() => onEditReview(article.id)}
                          >
                            {reviewByArticleId[article.id]
                              ? "Editeaza"
                              : "Evalueaza"}
                          </button>
                        </td>
                      </tr>
                      {activeReviewArticleId === article.id && (
                        <tr>
                          <td colSpan="4">
                            <div className="review-form">
                              <div className="form-group">
                                <label>Decizie</label>
                                <select
                                  value={
                                    reviewDrafts[article.id]?.decision ||
                                    "PENDING"
                                  }
                                  onChange={(e) =>
                                    onDraftChange(
                                      article.id,
                                      "decision",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="PENDING">PENDING</option>
                                  <option value="ACCEPT">ACCEPT</option>
                                  <option value="REJECT">REJECT</option>
                                  <option value="MODIFICATION_REQUIRED">
                                    MODIFICATION_REQUIRED
                                  </option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label>Feedback</label>
                                <textarea
                                  rows="3"
                                  value={
                                    reviewDrafts[article.id]?.comments || ""
                                  }
                                  onChange={(e) =>
                                    onDraftChange(
                                      article.id,
                                      "comments",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="form-actions">
                                <button
                                  className="btn-primary"
                                  onClick={() => onSubmitReview(article.id)}
                                >
                                  Salveaza
                                </button>
                                <button
                                  className="btn-secondary"
                                  onClick={onCancelReview}
                                >
                                  Anuleaza
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {}
        <div className="panel" style={{ marginTop: "24px" }}>
          <div className="panel-head">
            <h2>Recenziile Mele</h2>
            <span className="badge">{reviews.length}</span>
          </div>

          {loading ? (
            <p className="empty-state">Se incarca...</p>
          ) : reviews.length === 0 ? (
            <p className="empty-state">Nu ai nicio recenzie incă.</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Articol</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td>{review.article?.title || "Necunoscut"}</td>
                      <td>
                        <span className="status approved">
                          {review.decision || "PENDING"}
                        </span>
                      </td>
                      <td>
                        {new Date(review.createdAt).toLocaleDateString("ro-RO")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
