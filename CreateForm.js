import React, { useState } from 'react';
import { Container, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import axios from 'axios';

const CreateFormPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { type: 'text', value: '' }]);
    };

    const handleDeleteQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleQuestionChange = (event, index) => {
        const newQuestions = [...questions];
        newQuestions[index].value = event.target.value;
        setQuestions(newQuestions);
    };

    const handleTypeChange = (event, index) => {
        const newQuestions = [...questions];
        newQuestions[index].type = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAddRadio = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].radios = newQuestions[index].radios || [];
        newQuestions[index].radios.push('');
        setQuestions(newQuestions);
    };

    const handleAddCheckbox = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].checkboxes = newQuestions[index].checkboxes || [];
        newQuestions[index].checkboxes.push('');
        setQuestions(newQuestions);
    };

    const handleRemoveRadio = (questionIndex, radioIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].radios.splice(radioIndex, 1);
        setQuestions(newQuestions);
    };

    const handleRemoveCheckbox = (questionIndex, checkboxIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].checkboxes.splice(checkboxIndex, 1);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/createForm', {
                title,
                description,
                questions
            });
            if (response.status === 200) {
                console.log('Form Created.');
            } else {
                console.log(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error creating form:', error.message || JSON.stringify(error));
        }
    };

    return (
        <Container>
            <h1 className='mt-5 mb-5'><b>Create Form</b></h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel><h4><b>Title</b></h4></FormLabel>
                    <FormControl type="text" value={title} onChange={handleTitleChange} placeholder="Form Title" />
                    <FormControl className='mt-3' type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />
                </FormGroup>

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
                                {question.radios && question.radios.map((radio, radioIndex) => (
                                    <div key={radioIndex} className="mt-2">
                                        <FormControl
                                            type="text"
                                            value={radio}
                                            onChange={(event) => {
                                                const newQuestions = [...questions];
                                                newQuestions[index].radios[radioIndex] = event.target.value;
                                                setQuestions(newQuestions);
                                            }}
                                            placeholder={`Radio ${radioIndex + 1}`}
                                        />
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoveRadio(index, radioIndex)}
                                            className="ml-2"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="primary"
                                    onClick={() => handleAddRadio(index)}
                                    className="mt-2"
                                >
                                    Add Radio
                                </Button>
                            </div>
                        )}

                        {question.type === 'checkbox' && (
                            <div>
                                {question.checkboxes && question.checkboxes.map((checkbox, checkboxIndex) => (
                                    <div key={checkboxIndex} className="mt-2">
                                        <FormControl
                                            type="text"
                                            value={checkbox}
                                            onChange={(event) => {
                                                const newQuestions = [...questions];
                                                newQuestions[index].checkboxes[checkboxIndex] = event.target.value;
                                                setQuestions(newQuestions);
                                            }}
                                            placeholder={`Checkbox ${checkboxIndex + 1}`}
                                        />
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoveCheckbox(index, checkboxIndex)}
                                            className="ml-2"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="primary"
                                    onClick={() => handleAddCheckbox(index)}
                                    className="mt-2"
                                >
                                    Add Checkbox
                                </Button>
                            </div>
                        )}

                        <Button variant="danger" onClick={() => handleDeleteQuestion(index)} className="mt-2">Delete</Button>
                    </FormGroup>
                ))}

                <Button className="mt-2 mr-2" variant="primary" onClick={handleAddQuestion}>Add Question</Button>
                <Button variant="success" type="submit" className="mt-2 ml-2">Submit</Button>
            </Form>
        </Container>
    );
};

export default CreateFormPage;
