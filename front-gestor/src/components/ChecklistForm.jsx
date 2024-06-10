import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { createChecklistItem } from '../api';

function ChecklistForm({ selectedChecklistItem, onChecklistItemSaved, currentUser }) {
    const [title, setTitle] = useState(''); // Estado para almacenar el título del elemento de la checklist

    // useEffect para actualizar el título cuando se selecciona un elemento de la checklist
    useEffect(() => {
        if (selectedChecklistItem) {
            setTitle(selectedChecklistItem.title); // Si hay un elemento seleccionado, establece el título
        } else {
            setTitle(''); // Si no hay un elemento seleccionado, establece el título como vacío
        }
    }, [selectedChecklistItem]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página)
        const itemData = {
            title, // Título del nuevo elemento de la checklist
            user: currentUser, // Usuario actual
            completed: false, // Estado inicial del elemento (no completado)
        };

        try {
            await createChecklistItem(itemData); // Llama a la API para crear el nuevo elemento
            onChecklistItemSaved(); // Llama a la función para indicar que el elemento se ha guardado
        } catch (error) {
            console.error('Error saving checklist item:', error); // Manejo de errores en caso de fallo
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2 className="text-center">Add Checklist Item</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} // Actualiza el estado del título del nuevo elemento
                                required
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

export default ChecklistForm;
