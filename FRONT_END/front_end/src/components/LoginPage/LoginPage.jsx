import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../stores/actions/authAction";
import "./LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    dispatch(login(email.trim()));
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <form className="login-form" onSubmit={onSubmit}>
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
          <button type="submit">Logare</button>
        </form>
        <button type="button" className="login-link">
          Nu ai cont? Inregistreaza-te
        </button>
      </div>
    </div>
  );
}
