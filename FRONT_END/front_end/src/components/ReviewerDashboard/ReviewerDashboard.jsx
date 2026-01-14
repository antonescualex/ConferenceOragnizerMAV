import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const reviewerId = reviewer?.id;

 
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
    if (!selectedConferenceId) return;
    setLoading(true);
    req(`/conference/${selectedConferenceId}/articles`)
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [selectedConferenceId]);

  
  useEffect(() => {
    if (!selectedConferenceId || !reviewerId) return;
    setLoading(true);
    req(`/reviewer/${reviewerId}/conference/${selectedConferenceId}/reviews`)
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

  function onSelectConference(id) {
    setSelectedConferenceId(id);
    setMode("details");
  }

  function onBack() {
    setMode("list");
    setSelectedConferenceId(null);
  }

  if (mode === "list") {
    return (
      <div className="dash">
        <div className="topbar">
          <div className="topbar-welcome">
            <div className="topbar-title">Bine ai venit, {reviewer?.fullName || "Reviewer"} | Reviewer</div>
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
              <p className="empty-state">
                Nu sunt conferinte disponibile.
              </p>
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
            <p className="empty-state">Nu sunt articole disponibile pentru review.</p>
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
                    <tr key={article.id}>
                      <td>{article.title}</td>
                      <td>{article.author?.name || "Necunoscut"}</td>
                      <td>
                        <span className="status pending">În așteptare</span>
                      </td>
                      <td>
                        <button className="btn-sm">Recenzează</button>
                      </td>
                    </tr>
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
                    <th>Rating</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td>{review.article?.title || "Necunoscut"}</td>
                      <td>
                        <span className="status approved">Completă</span>
                      </td>
                      <td>{review.rating || "-"}/10</td>
                      <td>
                        {new Date(review.createdAt).toLocaleDateString(
                          "ro-RO"
                        )}
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
