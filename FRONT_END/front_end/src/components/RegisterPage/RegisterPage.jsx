import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../stores/actions/authAction";
import "../LoginPage/LoginPage.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("AUTHOR");

  function onSubmit(e) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !role) return;
    const action = registerUser({
      fullName: fullName.trim(),
      email: email.trim(),
      role,
    });
    dispatch(action);
    action.payload.then(() => navigate("/"));
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Inregistrare</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <label>
            Nume complet
            <input
              name="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nume Prenume"
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplu.ro"
              required
            />
          </label>
          <fieldset className="role-list">
            <legend>Tip utilizator</legend>
            <label>
              <input
                type="radio"
                name="role"
                value="REVIEWER"
                checked={role === "REVIEWER"}
                onChange={(e) => setRole(e.target.value)}
              />
              Reviewer
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="AUTHOR"
                checked={role === "AUTHOR"}
                onChange={(e) => setRole(e.target.value)}
              />
              Author
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="ORGANISER"
                checked={role === "ORGANISER"}
                onChange={(e) => setRole(e.target.value)}
              />
              Organiser
            </label>
          </fieldset>
          <button type="submit">Inregistrare</button>
        </form>
        <button
          type="button"
          className="login-link"
          onClick={() => navigate("/")}
        >
          Ai deja cont? Logheaza-te
        </button>
      </div>
    </div>
  );
}
