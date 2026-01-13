import React from "react";
import "./OrganiserPage.css";
import WelcomeBar from "../WelcomeBar/WelcomeBar.jsx";
import ConferenceContainer from "../Conference/ConferenceContainer/ConferenceContainer.jsx";

function OrganiserPage() {
  return (
    <>
      <div className="organiser-page">
        <WelcomeBar />
        <ConferenceContainer />
        <button className="buton-adaugare-conferinta">Adauga conferinta</button>
      </div>
    </>
  );
}

export default OrganiserPage;
