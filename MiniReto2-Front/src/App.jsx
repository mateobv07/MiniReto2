import React, { useState, useEffect } from "react";
import './App.css'
import TeamInfo from './components/TeamInfo/TeamInfo'
 
function App() {
  const [teamsInfo, setTeamsInfo] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/equipos", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => setTeamsInfo(data.equipos));
  }, []);

  return (
    <div className="main-container">
      {teamsInfo.map((team) => (
        <TeamInfo key={team.id} team={team}/>
      ))}
    </div>
  )
}

export default App
