import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddTeamPopUp({show, setShowTeamPopUp, team, setCurTeam, createTeam, editTeam, deleteTeam}) {

  return (
      <Modal centered show={show} onHide={() => setShowTeamPopUp(false)}>
        <Modal.Header closeButton >
          <Modal.Title>{!team.id ? "Agregar equipo" : "Editar equipo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del equipo</Form.Label>
              <Form.Control
                value={team.name}
                type="string"
                autoFocus
                onChange={(e) => setCurTeam({...team, name:e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL de la imagen</Form.Label>
              <Form.Control
                value={team.img}
                type="string"
                onChange={(e) => setCurTeam({...team, img:e.target.value})}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              >
              <Form.Label>Info del equipo</Form.Label>
              <Form.Control
               as="textarea" 
               rows={4} 
               value={team.info}
               onChange={(e) => setCurTeam({...team, info:e.target.value})}
               />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={team.id ? editTeam : createTeam}>
            {team.id ? "Update team" : "Add Team"}
          </Button>
          {team.id &&
            <Button variant="danger" onClick={deleteTeam}>
              Delete
            </Button>
          }
          <Button variant="secondary" onClick={() => setShowTeamPopUp(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default AddTeamPopUp;