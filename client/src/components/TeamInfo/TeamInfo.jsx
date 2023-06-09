import React from "react";
import "./TeamInfo.css"

const TeamInfo = ({ team, onClick }) => {
    return (
        <div className="team-container" onClick={onClick}>
            <h4 className="mt-2">{team.name}</h4>
            <div className="team-row">
                <img src={team.img} style={{objectFit:'contain'}} alt="img" width='40%' height='auto'/>
                <p className="team-text">{team.info}</p>
            </div>
        </div>
    );
}

export default TeamInfo;