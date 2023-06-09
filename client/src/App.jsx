import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
  const [teamsRanking, setTeamsRanking] = useState([]);

  useEffect(() => {
    getTeams();
  }, []);

  const editTeam = () => {
    fetch(import.meta.env.VITE_API_URL + "api/equipos/"+curTeam.id, 
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
    fetch(import.meta.env.VITE_API_URL + "api/equipos", 
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
    fetch(import.meta.env.VITE_API_URL + "api/equipos/"+curTeam.id, 
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
    fetch(import.meta.env.VITE_API_URL + "api/equipos", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      setTeamsInfo(data);
    });
  }

  const getRankings = () => {
    fetch(import.meta.env.VITE_API_URL + "api/rankings", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      setTeamsRanking(data) ;
    });
  }

  return (
    <>
      <NavBar setShowRankings={setShowRankings} getRankings={getRankings}/>
      <div className="main-container">
        {
          !showRankings ? 
          <>
            <h1 className='ranking-title'>Lista de equipos</h1>
            <Button variant="primary" onClick={() => (setCurTeam({name:"", img: "", info:""}), setShowTeamPopUp(true))}>
              Agregar Equipo
            </Button>
              <Container fluid='true'>
                <Row className="justify-content-center">
                  { teamsInfo.map((team) => (
                    <Col xs={11} md={4} key={team.id}>
                      <TeamInfo  team={team} onClick={() => (setCurTeam(team), setShowTeamPopUp(true))}/>
                      </Col>
                  ))}
                </Row>
              </Container>
          </>
          :
          <TeamRankings teams={teamsRanking} />
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