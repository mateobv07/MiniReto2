import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import './styles.css'

const TeamRankings = ({ teams }) => {
  return (
    <div>
      <h1 className='ranking-title'>Mejores equipos de fútbol</h1>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <ListGroup>
            {teams.map((team, i) => (
              <ListGroup.Item key={team.id}>
                { i+1 }. &nbsp;
                { team.name }
                &nbsp;&nbsp;
                <img src={team.img} width={30} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default TeamRankings;