import { Modal, MenuItem, Button, Navbar, FormGroup, FormControl, DropdownButton, ControlLabel } from 'react-bootstrap';
import React from 'react';

const Trigger = () => {
    return (
        <Modal
          show={true}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
}
export default Trigger;
