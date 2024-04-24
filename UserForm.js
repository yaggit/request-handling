import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

const RenderFormPage = () => {
    const [form, setForm] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchFormData(); // Fetch form data when the component mounts
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getForm'); // Change the URL as per your backend endpoint
            setForm(response.data.form);
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/submitResponse', formData); // Change the URL as per your backend endpoint
            console.log('Response submitted successfully:', response.data.message);
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    if (!form) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <h1 className='mt-5 mb-5'><b>Render Form</b></h1>
            <Form onSubmit={handleSubmit}>
            // Inside the component where you render the form
                {questions.map((question, index) => (
                    <FormGroup key={index}>
                        <FormLabel><h5 className='mt-3'>Question {index + 1}</h5></FormLabel>
                        <FormControl type="text" value={question.value} onChange={(event) => handleQuestionChange(event, index)} placeholder="Enter question" />
                        <Form.Control as="select" value={question.type} onChange={(event) => handleTypeChange(event, index)} className="mt-2">
                            <option value="text">Text</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                        </Form.Control>

                        {question.type === 'radio' && (
                            <div>
                                {question.options && question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="mt-2">
                                        <input type="radio" name={`radio_${index}`} value={option} />
                                        <label>{option}</label>
                                    </div>
                                ))}
                                <Button variant="primary" onClick={() => handleAddRadioOption(index)} className="mt-2">Add Option</Button>
                            </div>
                        )}

                        {question.type === 'checkbox' && (
                            <div>
                                {question.options && question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="mt-2">
                                        <input type="checkbox" name={`checkbox_${index}_${optionIndex}`} value={option} />
                                        <label>{option}</label>
                                    </div>
                                ))}
                                <Button variant="primary" onClick={() => handleAddCheckboxOption(index)} className="mt-2">Add Option</Button>
                            </div>
                        )}

                        <Button variant="danger" onClick={() => handleDeleteQuestion(index)} className="mt-2">Delete</Button>
                    </FormGroup>
                ))}


                <Button variant="primary" type="submit" className="mt-2">Submit</Button>
            </Form>
        </Container>
    );
};

export default RenderFormPage;
