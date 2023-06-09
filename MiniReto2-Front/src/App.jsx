import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import './App.css'
import TeamInfo from './components/TeamInfo/TeamInfo'
import NavBar from './components/NavBar/NavBar'
import TeamRankings from './components/TeamRankings/TeamRankings'
import AddTeamPopUp from './components/AddTeamPopUp/AddTeamPopUp'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [teamsInfo, setTeamsInfo] = useState([]);
  const [showRankings, setShowRankings] = useState(false);
  const [showTeamPopUp, setShowTeamPopUp] = useState(false);
  const [curTeam, setCurTeam] = useState({name:"", img: "", info:""});
  const teamsRanking = [{name: "test", id: 1}, {name: "test", id: 2}]

  useEffect(() => {
    getTeams();
  }, []);

  const editTeam = () => {
    fetch("http://127.0.0.1:3000/api/equipos/"+curTeam.id, 
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: curTeam.name,
        info: curTeam.info,
        img: curTeam.img
      })
    })
    .then(response => response.json())
    .then((data) => {
      getTeams();
      setShowTeamPopUp(false);
    });
  }

  const createTeam = () => {
    fetch("http://127.0.0.1:3000/api/equipos", 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: curTeam.name,
        info: curTeam.info,
        img: curTeam.img
      })
    })
    .then(response => response.json())
    .then((data) => {
      getTeams();
      setShowTeamPopUp(false);
    });
  }

  const deleteTeam = () => {
    fetch("http://127.0.0.1:3000/api/equipos/"+curTeam.id, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then((data) => {
      getTeams();
      setShowTeamPopUp(false);
    });
  }

  const getTeams = () => {
    fetch("http://127.0.0.1:3000/api/equipos", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      setTeamsInfo(data) 
    });
  }

  return (
    <>
      <NavBar setShowRankings={setShowRankings}/>
      <div className="main-container">
        {
          !showRankings ? 
          <>
            <h1 className='ranking-title'>Lista de equipos</h1>
            <Button variant="primary" onClick={() => (setCurTeam({name:"", img: "", info:""}), setShowTeamPopUp(true))}>
              Agregar Equipo
            </Button>
            <div className="teams-container">
              { teamsInfo.map((team) => (
                <TeamInfo key={team.id} team={team} onClick={() => (setCurTeam(team), setShowTeamPopUp(true))}/>
              ))}
            </div>
          </>
          :
          <TeamRankings teams={[{name: "test", id: 1}, {name: "test", id: 2}]} />
        }    
      </div>
      <AddTeamPopUp 
        show={showTeamPopUp} 
        setShowTeamPopUp={setShowTeamPopUp} 
        team={curTeam} 
        setCurTeam={setCurTeam}
        createTeam={createTeam}  
        editTeam={editTeam}  
        deleteTeam={deleteTeam}
      />
    </>
  )
}

export default App;