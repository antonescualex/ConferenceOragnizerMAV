import React from "react";
import "./LoginPage.css";

function LoginPage() {
  return (
    <>
      <div className="login-page">
        <form className="login-form">
          <h1 className="login-title">Autentificare</h1>
          <input
            type="email"
            placeholder="Email..."
            className="login-input"
          ></input>
          <input
            type="password"
            placeholder="Parola..."
            className="login-input"
          ></input>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="login-register">Nu ai cont? Creeaza cont</p>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
