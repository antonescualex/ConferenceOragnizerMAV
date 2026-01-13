import React from "react";
import "./RegisterPage.css";

function RegisterPage() {
  return (
    <>
      <div className="register-page">
        <form className="register-form">
          <h1 className="register-title">Inregistrare</h1>
          <input
            type="email"
            placeholder="Email..."
            className="register-input"
          ></input>
          <input
            type="password"
            placeholder="Parola..."
            className="register-input"
          ></input>
          <input
            type="password"
            placeholder="Repeta Parola..."
            className="register-input"
          ></input>
          <select className="register-input">
            <option value="">Selecteaza rolul</option>
            <option value="AUTHOR">Autor</option>
            <option value="REVIEWER">Reviewer</option>
            <option value="ORGANISER">Organizator</option>
          </select>
          <button type="submit" className="register-button">
            Creeaza cont
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
