import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createConference,
  fetchOrganiserConferences,
  fetchConferenceArticles,
  fetchConferenceReviewers,
  setConferenceReviewers,
} from "../../stores/actions/conferenceAction";
import { req } from "../../stores/actions/authAction";
import "./OrganiserDashboard.css";

const emptyForm = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
};

export default function OrganiserDashboard() {
  const dispatch = useDispatch();
  const organiser = useSelector((state) => state.auth.data);
  const conferences = useSelector((state) => state.conferences.data);
  const conferenceArticles = useSelector(
    (state) => state.conferences.conferenceArticle
  );
  const conferenceReviewersRaw = useSelector(
    (state) => state.conferences.conferenceReviewers
  );

  const [form, setForm] = useState(emptyForm);
  const [selectedConferenceId, setSelectedConferenceId] = useState(null);
  const [allReviewers, setAllReviewers] = useState([]);
  const [selectedReviewerIds, setSelectedReviewerIds] = useState([]);
  const [mode, setMode] = useState("list");

  const organiserId = organiser?.id;

  useEffect(() => {
    if (organiserId) {
      dispatch(fetchOrganiserConferences(organiserId));
    }
  }, [dispatch, organiserId]);

  useEffect(() => {
    req("/reviewers")
      .then((list) => setAllReviewers(list || []))
      .catch(() => setAllReviewers([]));
  }, []);

  useEffect(() => {
    if (!selectedConferenceId) return;
    dispatch(fetchConferenceArticles(selectedConferenceId));
    dispatch(fetchConferenceReviewers(selectedConferenceId));
  }, [dispatch, selectedConferenceId]);

  const conferenceReviewers = useMemo(() => {
    if (Array.isArray(conferenceReviewersRaw)) return conferenceReviewersRaw;
    return conferenceReviewersRaw?.reviewers || [];
  }, [conferenceReviewersRaw]);

  const selectedConference = useMemo(() => {
    return (conferences || []).find((c) => c.id === selectedConferenceId);
  }, [conferences, selectedConferenceId]);

  useEffect(() => {
    if (!selectedConferenceId) return;
    setSelectedReviewerIds(conferenceReviewers.map((r) => r.id));
  }, [selectedConferenceId, conferenceReviewers]);

  function onFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onCreateConference(e) {
    e.preventDefault();
    if (!organiserId) return;
    dispatch(
      createConference({
        ...form,
        organiserId,
      })
    );
    setForm(emptyForm);
    setMode("list");
  }

  function toggleReviewer(id) {
    setSelectedReviewerIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function onSelectConference(id) {
    setSelectedConferenceId(id);
    setMode("details");
  }

  function onStartCreate() {
    setSelectedConferenceId(null);
    setMode("form");
  }

  function onBackToList() {
    setMode("list");
  }

  function onSaveReviewers() {
    if (!selectedConferenceId) return;
    dispatch(setConferenceReviewers(selectedConferenceId, selectedReviewerIds));
  }

  return (
    <div className="dash">
      <div className="topbar">
        <div className="topbar-title">
          Bine ai venit, {organiser?.fullName || "Organiser"} | Organizator</div>
        <div className="topbar-sub">{organiser?.email || ""}</div>
      </div>

      <main className="main">
        {mode === "list" && (
          <section className="panel">
            <div className="panel-head">
              <h2>Conferintele mele</h2>
              <button type="button" className="btn" onClick={onStartCreate}>
                Adauga conferinta
              </button>
            </div>
            <div className="list">
              {(conferences || []).map((c) => (
                <button
                  key={c.id}
                  className="list-item"
                  onClick={() => onSelectConference(c.id)}
                >
                  <div className="list-title">{c.name}</div>
                  <div className="list-sub">
                    {c.startDate} - {c.endDate}
                  </div>
                </button>
              ))}
              {(!conferences || conferences.length === 0) && (
                <p className="muted">Nu ai conferinte inca.</p>
              )}
            </div>
          </section>
        )}

        {mode === "form" && (
          <section className="panel">
            <div className="panel-head">
              <h2>Conferinta noua</h2>
              <button
                type="button"
                className="btn ghost"
                onClick={onBackToList}
              >
                Inapoi
              </button>
            </div>
            <form className="form" onSubmit={onCreateConference}>
              <label>
                Nume conferinta
                <input
                  name="name"
                  value={form.name}
                  onChange={onFormChange}
                  placeholder="Nume conferinta..."
                  required
                />
              </label>
              <label>
                Descriere
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onFormChange}
                  placeholder="Descriere..."
                />
              </label>
              <label>
                Data pentru inceputul conferintei (DD.MM.YYYY)
                <input
                  name="startDate"
                  value={form.startDate}
                  onChange={onFormChange}
                  placeholder="Data inceput..."
                  inputMode="numeric"
                  required
                />
              </label>
              <label>
                Data pentru terminarea conferintei (DD.MM.YYYY)
                <input
                  name="endDate"
                  value={form.endDate}
                  onChange={onFormChange}
                  placeholder="Data final..."
                  inputMode="numeric"
                  required
                />
              </label>
              <button type="submit" className="btn">
                Creeaza
              </button>
            </form>
          </section>
        )}

        {mode === "details" && (
          <section className="panel">
            <div className="panel-head">
              <div>
                <h2>{selectedConference?.name || "Conferinta"}</h2>
                <div className="panel-sub">
                  {selectedConference?.startDate} -{" "}
                  {selectedConference?.endDate}
                </div>
              </div>
              <button
                type="button"
                className="btn ghost"
                onClick={onBackToList}
              >
                Inapoi
              </button>
            </div>

            <div className="split">
              <div className="block">
                <h3>Revieweri</h3>
                <div className="reviewer-list">
                  {allReviewers.map((r) => (
                    <label key={r.id} className="check">
                      <input
                        type="checkbox"
                        checked={selectedReviewerIds.includes(r.id)}
                        onChange={() => toggleReviewer(r.id)}
                      />
                      <span>
                        {r.fullName} ({r.email})
                      </span>
                    </label>
                  ))}
                </div>
                <button className="btn" onClick={onSaveReviewers}>
                  Salveaza revieweri
                </button>
                <div className="muted">
                  Alocati acum: {conferenceReviewers.length}
                </div>
              </div>

              <div className="block">
                <h3>Articole</h3>
                <div className="articles">
                  {(conferenceArticles || []).map((a) => (
                    <div className="article-row" key={a.id}>
                      <div>
                        <div className="list-title">{a.title}</div>
                        <div className="list-sub">Autor #{a.authorId}</div>
                      </div>
                      <span className="status">{a.status || "UNKNOWN"}</span>
                    </div>
                  ))}
                  {(!conferenceArticles || conferenceArticles.length === 0) && (
                    <p className="muted">
                      Nu exista articole pentru aceasta conferinta.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
