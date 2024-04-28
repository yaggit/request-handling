// PublicLinkModal.js

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PublicLinkModal = ({ show, handleClose, publicLink }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Public Link for Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Share this link with users to fill out the form:</p>
        <p>{publicLink}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PublicLinkModal;
