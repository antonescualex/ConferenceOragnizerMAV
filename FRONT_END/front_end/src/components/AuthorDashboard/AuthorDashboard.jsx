import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { req } from "../../stores/actions/authAction";
import "./AuthorDashboard.css";

export default function AuthorDashboard() {
  const author = useSelector((state) => state.auth.data);
  const [articles, setArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [articleReviews, setArticleReviews] = useState([]);
  const [mode, setMode] = useState("list");
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    conferenceId: "",
  });
  const [conferences, setConferences] = useState([]);
  const [registeredConferences, setRegisteredConferences] = useState([]);

  const authorId = author?.id;

  useEffect(() => {
    if (!authorId) return;
    setLoading(true);
    req(`/authors/${authorId}/articles`)
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [authorId]);

  useEffect(() => {
    setLoading(true);
    req(`/conferences`)
      .then((data) => {
        setConferences(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching conferences:", err);
        setConferences([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!authorId) return;
    setLoading(true);
    req(`/authors/${authorId}/conferences`)
      .then((data) => {
        setRegisteredConferences(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching registered conferences:", err);
        setRegisteredConferences([]);
      })
      .finally(() => setLoading(false));
  }, [authorId]);

  useEffect(() => {
    if (!selectedArticleId) return;
    setLoading(true);
    req(`/articles/${selectedArticleId}/reviews`)
      .then((data) => {
        setArticleReviews(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setArticleReviews([]);
      })
      .finally(() => setLoading(false));
  }, [selectedArticleId]);

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  function onSelectArticle(id) {
    setSelectedArticleId(id);
    setMode("details");
  }

  function onBack() {
    setMode("list");
    setSelectedArticleId(null);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleRegisterToConference(conferenceId) {
    if (!authorId || !conferenceId) return;
    setLoading(true);
    req(`/conferences/${conferenceId}/authors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authorId }),
    })
      .then(() => req(`/authors/${authorId}/conferences`))
      .then((data) => {
        setRegisteredConferences(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Eroare la inregistrare:", err);
      })
      .finally(() => setLoading(false));
  }

  function handleCreateArticle(e) {
    e.preventDefault();
    if (!authorId || !formData.title.trim() || !formData.conferenceId) return;

    setLoading(true);
    req("/article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        authorId,
      }),
    })
      .then(() => {
        setFormData({ title: "", content: "", conferenceId: "" });
        setShowCreateForm(false);
        return req(`/authors/${authorId}/articles`);
      })
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Eroare la crearea articolului:", err);
      })
      .finally(() => setLoading(false));
  }

  if (mode === "list") {
    return (
      <div className="dash">
        <div className="topbar">
          <div className="topbar-welcome">
            <div className="topbar-title">
              Bine ai venit, {author?.fullName || "Author"} | Autor
            </div>
          </div>
          <div className="topbar-email">
            {author?.email || "email@exemplu.ro"}
          </div>
        </div>

        <div className="main">
          <div className="panel">
            <div className="panel-head">
              <h2>Toate conferintele</h2>
              <span className="badge">{conferences.length}</span>
            </div>
            {loading ? (
              <p className="empty-state">Se ÆRncarcŽ?...</p>
            ) : conferences.length === 0 ? (
              <p className="empty-state">Nu exista conferinte disponibile.</p>
            ) : (
              <div className="articles-list">
                {conferences.map((conf) => {
                  const isRegistered = registeredConferences.some(
                    (c) => c.id === conf.id
                  );
                  return (
                    <div key={conf.id} className="article-item">
                      <div className="article-header">
                        <h3>{conf.name}</h3>
                      </div>
                      <p className="article-desc">{conf.description}</p>
                      <div className="article-meta">
                        <span>
                          {new Date(conf.startDate).toLocaleDateString("ro-RO")}{" "}
                          - {new Date(conf.endDate).toLocaleDateString("ro-RO")}
                        </span>
                      </div>
                      <button
                        className="btn-sm"
                        onClick={() => handleRegisterToConference(conf.id)}
                        disabled={isRegistered}
                      >
                        {isRegistered ? "Inscris" : "Inscrie-te"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="panel">
            <div className="panel-head">
              <h2>Conferintele mele</h2>
              <span className="badge">{registeredConferences.length}</span>
            </div>
            {loading ? (
              <p className="empty-state">Se ÆRncarcŽ?...</p>
            ) : registeredConferences.length === 0 ? (
              <p className="empty-state">
                Nu esti inscris la nicio conferinta.
              </p>
            ) : (
              <div className="articles-list">
                {registeredConferences.map((conf) => (
                  <div key={conf.id} className="article-item">
                    <div className="article-header">
                      <h3>{conf.name}</h3>
                    </div>
                    <p className="article-desc">{conf.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel">
            <div className="panel-head">
              <h2>Articolele Mele</h2>
              <span className="badge">{articles.length}</span>
            </div>

            {!showCreateForm ? (
              <button
                className="btn-primary"
                onClick={() => setShowCreateForm(true)}
              >
                + Articol Nou
              </button>
            ) : (
              <form className="create-form" onSubmit={handleCreateArticle}>
                <div className="form-group">
                  <label>Titlu</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="Titlul articolului"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Conferinaă</label>
                  <select
                    name="conferenceId"
                    value={formData.conferenceId}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Selecteaza conferinta</option>
                    {registeredConferences.map((conf) => (
                      <option key={conf.id} value={conf.id}>
                        {conf.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Continut</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    placeholder="Conținutul articolului"
                    rows="6"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    Trimite
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Anuleaza
                  </button>
                </div>
              </form>
            )}

            {loading ? (
              <p className="empty-state">Se încarca...</p>
            ) : articles.length === 0 ? (
              <p className="empty-state">
                Nu ai niciun articol publicat inca. Creeaza unul!
              </p>
            ) : (
              <div className="articles-list">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="article-item"
                    onClick={() => onSelectArticle(article.id)}
                  >
                    <div className="article-header">
                      <h3>{article.title}</h3>
                      <span
                        className={`status ${getStatusClass(article.status)}`}
                      >
                        {article.status || "Trimis"}
                      </span>
                    </div>
                    <p className="article-desc">
                      {article.content?.substring(0, 100)}...
                    </p>
                    <div className="article-meta">
                      <span>
                        {" "}
                        {new Date(article.createdAt).toLocaleDateString(
                          "ro-RO"
                        )}
                      </span>
                      <span> {article.reviews?.length || 0} recenzii</span>
                    </div>
                    <button className="btn-sm">Vezi detalii</button>
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
        <div className="topbar-title">{selectedArticle?.title}</div>
      </div>

      <div className="main">
        <div className="panel">
          <div className="panel-head">
            <h2>Detalii Articol</h2>
            <span
              className={`status ${getStatusClass(selectedArticle?.status)}`}
            >
              {selectedArticle?.status || "Trimis"}
            </span>
          </div>

          {selectedArticle && (
            <div className="article-details">
              <div className="detail-section">
                <h3>Continut</h3>
                <p>{selectedArticle.content}</p>
              </div>

              <div className="detail-meta">
                <div>
                  <strong>Data crearii:</strong>{" "}
                  {new Date(selectedArticle.createdAt).toLocaleDateString(
                    "ro-RO"
                  )}
                </div>
                <div>
                  <strong>Conferinta:</strong>{" "}
                  {selectedArticle.conference?.name || "N/A"}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="panel" style={{ marginTop: "24px" }}>
          <div className="panel-head">
            <h2>Recenzii Primite</h2>
            <span className="badge">{articleReviews.length}</span>
          </div>

          {loading ? (
            <p className="empty-state">Se încarca...</p>
          ) : articleReviews.length === 0 ? (
            <p className="empty-state">Nu ai primit nicio recenzie inca.</p>
          ) : (
            <div className="reviews-list">
              {articleReviews.map((review) => (
                <div
                  key={review.id}
                  className={`review-item ${getReviewStatus(review.decision)}`}
                >
                  <div className="review-header">
                    <div>
                      <strong>{review.reviewer?.fullName || "Anonim"}</strong>
                      <p className="review-date">
                        {new Date(review.createdAt).toLocaleDateString("ro-RO")}
                      </p>
                    </div>
                    <span className="rating">
                      {review.decision || "PENDING"}
                    </span>
                  </div>
                  <p className="review-content">{review.comments}</p>
                  <span
                    className={`review-status ${getReviewStatus(
                      review.decision
                    )}`}
                  >
                    {review.decision || "PENDING"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getStatusClass(status) {
  if (!status) return "pending";
  const normalized = status.toUpperCase();
  if (normalized.includes("ACCEPTED")) return "approved";
  if (normalized.includes("REJECTED")) return "rejected";
  return "pending";
}

function getReviewStatus(status) {
  if (!status) return "pending";
  const normalized = status.toUpperCase();
  if (normalized === "ACCEPT") return "approved";
  if (normalized === "REJECT") return "rejected";
  return "pending";
}
