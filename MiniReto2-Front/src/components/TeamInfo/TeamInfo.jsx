import React from "react";
import "./TeamInfo.css"

const TeamInfo = ({ team, onClick }) => {
    return (
        <div className="team-container" onClick={onClick}>
                <img src={team.img} style={{objectFit:'contain'}} alt="img" width='40%' height='auto'/>
                <p className="team-text">{team.info}</p>
        </div>
    );
}

export default TeamInfo;