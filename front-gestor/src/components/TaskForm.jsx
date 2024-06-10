import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { createTask, updateTask } from '../api';

function TaskForm({ selectedTask, onTaskSaved, currentUser }) {
    const [title, setTitle] = useState(''); // Estado para almacenar el título de la tarea
    const [description, setDescription] = useState(''); // Estado para almacenar la descripción de la tarea
    const [pdf, setPdf] = useState(null); // Estado para almacenar el archivo PDF
    const [photoUrl, setPhotoUrl] = useState(''); // Estado para almacenar la URL de la foto

    // useEffect para actualizar los campos del formulario cuando se selecciona una tarea
    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title); // Establece el título de la tarea seleccionada
            setDescription(selectedTask.description); // Establece la descripción de la tarea seleccionada
            setPhotoUrl(selectedTask.photo_url || ''); // Establece la URL de la foto de la tarea seleccionada
        } else {
            setTitle(''); // Limpia el título si no hay tarea seleccionada
            setDescription(''); // Limpia la descripción si no hay tarea seleccionada
            setPhotoUrl(''); // Limpia la URL de la foto si no hay tarea seleccionada
        }
    }, [selectedTask]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página)
        const formData = new FormData(); // Crea un nuevo objeto FormData para enviar los datos del formulario
        formData.append('title', title); // Añade el título al FormData
        formData.append('description', description); // Añade la descripción al FormData
        formData.append('user', currentUser); // Añade el usuario actual al FormData
        formData.append('photo_url', photoUrl); // Añade la URL de la foto al FormData

        if (pdf) {
            formData.append('pdf', pdf); // Si hay un archivo PDF, lo añade al FormData
        }

        try {
            if (selectedTask) {
                await updateTask(selectedTask.title, formData, currentUser); // Si hay una tarea seleccionada, actualiza la tarea
            } else {
                await createTask(formData); // Si no hay una tarea seleccionada, crea una nueva tarea
            }
            onTaskSaved(); // Llama a la función para indicar que la tarea se ha guardado
        } catch (error) {
            console.error('Error saving task:', error); // Manejo de errores en caso de fallo
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2 className="text-center">{selectedTask ? 'Edit Note' : 'Create Note'}</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} // Actualiza el estado del título
                                required
                                disabled={!!selectedTask} // Deshabilita el campo si se está editando una tarea
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} // Actualiza el estado de la descripción
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPdf">
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setPdf(e.target.files[0])} // Actualiza el estado del archivo PDF
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhotoUrl">
                            <Form.Label>Photo URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)} // Actualiza el estado de la URL de la foto
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default TaskForm;
