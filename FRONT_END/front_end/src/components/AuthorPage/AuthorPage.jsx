import React from "react";
import "./AuthorPage.css"
import WelcomeBar from "../WelcomeBar/WelcomeBar.jsx";
import ConferenceContainer from "../Conference/ConferenceContainer/ConferenceContainer.jsx";

function AuthorPage(){

    return(
        <>
        <div className="author-page">
            <WelcomeBar/>
            <ConferenceContainer/>
            <button className="buton-inscriere-conferinta">Inscriere conferinta</button>

        </div>
        </>
    )
}

export default AuthorPage;