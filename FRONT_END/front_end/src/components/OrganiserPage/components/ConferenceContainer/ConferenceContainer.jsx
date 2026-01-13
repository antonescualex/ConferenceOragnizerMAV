import React from "react";
import "./ConferenceContainer.css";
import ConferenceCard from "../ConferenceCard/ConferenceCard.jsx";

function ConferenceContainer() {
  return (
    <>
      <div className="conference-container">
        <ConferenceCard />
        <ConferenceCard />
        <ConferenceCard />
        <ConferenceCard />
        <ConferenceCard />
        <ConferenceCard />
        <ConferenceCard />
        <ConferenceCard />
      </div>
    </>
  );
}

export default ConferenceContainer;
