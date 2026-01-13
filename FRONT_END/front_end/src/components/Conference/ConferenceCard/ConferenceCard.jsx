import React from "react";
import "./ConferenceCard.css";

function ConferenceCard() {
  return (
    <>
      <div className="conference-card">
        <div className="conference-title">Titlu</div>
        <div className="conference-description">Descriere</div>
        <div className="conference-dates">
          <p>Start date</p>
          <p>End date</p>
        </div>
      </div>
    </>
  );
}

export default ConferenceCard;
