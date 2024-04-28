// CreateForm.js

import React, { useState } from 'react';
import { Container, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import PublicLinkModal from './PublicLinkModal'; // Import the modal component

const CreateForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [publicLink, setPublicLink] = useState('');

  // Function to generate a public link for the form
  const generatePublicLink = () => {
    // Logic to generate the public link (e.g., concatenate base URL with form ID)
    const formId = 'abc123'; // Replace with actual form ID
    const link = `http://example.com/forms/${formId}`;
    setPublicLink(link);
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      {/* Your existing Create Form content */}
      
      {/* Button to trigger the modal */}
      <Button variant="primary" onClick={generatePublicLink}>
        Get Public Link
      </Button>

      {/* Public Link Modal */}
      <PublicLinkModal
        show={showModal}
        handleClose={handleCloseModal}
        publicLink={publicLink}
      />
    </Container>
  );
};

export default CreateForm;
