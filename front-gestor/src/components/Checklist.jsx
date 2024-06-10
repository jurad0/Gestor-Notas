import React, { useState, useEffect } from 'react';
import { ListGroup, Button, FormCheck, Row, Col, Card, Container, InputGroup, FormControl } from 'react-bootstrap';
import { fetchChecklistItems, updateChecklistItem, deleteChecklistItem, createChecklistItem } from '../api';
import { Trash } from 'react-bootstrap-icons';

function Checklist({ currentUser }) {
    const [items, setItems] = useState([]); // Estado para almacenar los elementos de la checklist
    const [newTitle, setNewTitle] = useState(''); // Estado para almacenar el título del nuevo elemento

    // useEffect para cargar los elementos de la checklist cuando el componente se monta
    useEffect(() => {
        loadItems();
    }, []);

    // Función para cargar los elementos de la checklist desde la API
    const loadItems = async () => {
        try {
            const data = await fetchChecklistItems(currentUser); // Llamada a la API para obtener los elementos de la checklist
            setItems(data); // Actualiza el estado con los datos recibidos
        } catch (error) {
            console.error('Error fetching checklist items:', error); // Manejo de errores en caso de fallo
        }
    };

    // Función para actualizar un elemento de la checklist
    const handleUpdateItem = async (id, updatedItem) => {
        try {
            const itemData = { ...updatedItem, user: currentUser }; // Datos actualizados del elemento
            await updateChecklistItem(id, itemData); // Llamada a la API para actualizar el elemento
            setItems(items.map(item => (item._id === id ? { ...item, ...updatedItem } : item))); // Actualiza el estado con el elemento actualizado
        } catch (error) {
            console.error('Error updating checklist item:', error); // Manejo de errores en caso de fallo
        }
    };

    // Función para eliminar un elemento de la checklist
    const handleDeleteItem = async (id) => {
        try {
            await deleteChecklistItem(id); // Llamada a la API para eliminar el elemento
            setItems(items.filter(item => item._id !== id)); // Actualiza el estado eliminando el elemento
        } catch (error) {
            console.error('Error deleting checklist item:', error); // Manejo de errores en caso de fallo
        }
    };

    // Función para alternar el estado de finalización de un elemento de la checklist
    const toggleCompletion = async (id, completed) => {
        const item = items.find(item => item._id === id); // Encuentra el elemento por su ID
        if (item) {
            await handleUpdateItem(id, { ...item, completed }); // Actualiza el estado de finalización del elemento
        }
    };

    // Función para crear un nuevo elemento en la checklist
    const handleCreateItem = async () => {
        if (newTitle.trim() === '') return; // Si el título está vacío, no hace nada
        try {
            const itemData = { title: newTitle, user: currentUser, completed: false }; // Datos del nuevo elemento
            const response = await createChecklistItem(itemData); // Llamada a la API para crear el nuevo elemento
            setItems([...items, response]); // Actualiza el estado con el nuevo elemento
            setNewTitle(''); // Limpia el campo del título del nuevo elemento
        } catch (error) {
            console.error('Error creating checklist item:', error); // Manejo de errores en caso de fallo
        }
    };

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col>
                    <InputGroup>
                        <FormControl
                            placeholder="Add new item"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)} // Actualiza el estado del título del nuevo elemento
                        />
                        <Button variant="success" onClick={handleCreateItem}>Add</Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                {items.map(item => (
                    <Col md={4} key={item._id} className="mb-3">
                        <Card>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <FormCheck
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={(e) => toggleCompletion(item._id, e.target.checked)} // Alterna el estado de finalización del elemento
                                />
                                <div className="mx-2" style={{ flex: 1 }}>
                                    {item.title}
                                </div>
                                <Button variant="danger" onClick={() => handleDeleteItem(item._id)}>
                                    <Trash />
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Checklist;
