import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import './styles.css'

const TeamRankings = ({ teams }) => {
  console.log(teams)
  return (
    <div>
      <h1 className='ranking-title'>Mejores equipos de fútbol</h1>
      <Row className="justify-content-md-center">
        <Col md={7}>
          <ListGroup>
            {teams.map((team) => (
              <ListGroup.Item key={team.id}>{team.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default TeamRankings;