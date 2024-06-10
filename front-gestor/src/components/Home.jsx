import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button, Modal, Navbar, Nav } from 'react-bootstrap';
import { JournalPlus, ListTask, Sun, Moon, Linkedin, Github, Instagram } from 'react-bootstrap-icons';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Checklist from './Checklist';
import ChecklistForm from './ChecklistForm';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/home.css'; // Asegúrate de importar el archivo CSS aquí

function Home() {
    const [selectedTask, setSelectedTask] = useState(null); // Estado para almacenar la tarea seleccionada
    const [showTaskForm, setShowTaskForm] = useState(false); // Estado para controlar la visibilidad del formulario de tareas
    const [showChecklistForm, setShowChecklistForm] = useState(false); // Estado para controlar la visibilidad del formulario de checklist
    const { theme, toggleTheme } = useContext(ThemeContext); // Contexto del tema para controlar el tema actual

    // Función para manejar cuando una tarea ha sido guardada
    const handleTaskSaved = () => {
        setSelectedTask(null); // Reinicia la tarea seleccionada
        setShowTaskForm(false); // Oculta el formulario de tareas
        window.location.reload(); // Recarga la página para actualizar las tareas
    };

    // Función para manejar cuando un elemento de la checklist ha sido guardado
    const handleChecklistItemSaved = () => {
        setShowChecklistForm(false); // Oculta el formulario de checklist
        window.location.reload(); // Recarga la página para actualizar la checklist
    };

    // Función para mostrar el formulario de tareas
    const handleShowTaskForm = () => setShowTaskForm(true);

    // Función para cerrar el formulario de tareas
    const handleCloseTaskForm = () => {
        setSelectedTask(null); // Reinicia la tarea seleccionada
        setShowTaskForm(false); // Oculta el formulario de tareas
    };

    // Función para mostrar el formulario de checklist
    const handleShowChecklistForm = () => setShowChecklistForm(true);

    // Función para cerrar el formulario de checklist
    const handleCloseChecklistForm = () => setShowChecklistForm(false);

    const currentUser = localStorage.getItem("userLogged"); // Obtiene el usuario actual del almacenamiento local

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.clear(); // Limpia el almacenamiento local
        window.location.href = '/login'; // Redirige a la página de inicio de sesión
    };

    return (
        <>
            <Navbar bg={theme === 'light' ? 'light' : 'dark'} variant={theme} expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="src\img\Whatever_logo.png" // Ruta de la imagen del logo en la carpeta `public`
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                        {' '}
                        WhatEver
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Button variant="success" onClick={handleShowTaskForm} className="me-2 mb-2 mb-lg-0 mt-2 mt-lg-0">
                                <JournalPlus className="me-1" /> Add Notes
                            </Button>
                            <Button variant="success" onClick={handleShowChecklistForm} className="me-2 mb-2 mb-lg-0 mt-2 mt-lg-0">
                                <ListTask className="me-1" /> Add Items
                            </Button>
                        </Nav>
                        <Button variant="outline-secondary" onClick={toggleTheme} className="me-2">
                            {theme === 'light' ? <Moon /> : <Sun />}
                        </Button>
                        <Navbar.Text className="me-2">
                            <i>Welcome {currentUser}!</i>
                        </Navbar.Text>
                        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main>
                <Container>
                    <Row className="my-4">
                        <Col>
                            <h1>Notes Management</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TaskList onSelectTask={(task) => { setSelectedTask(task); setShowTaskForm(true); }} />
                        </Col>
                    </Row>

                    <Modal show={showTaskForm} onHide={handleCloseTaskForm} dialogClassName="modal-light">
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedTask ? 'Edit Note' : 'New Note'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TaskForm
                                selectedTask={selectedTask}
                                onTaskSaved={handleTaskSaved}
                                currentUser={currentUser}
                            />
                        </Modal.Body>
                    </Modal>

                    <hr /> {/* Separador */}

                    <Row className="my-4">
                        <Col>
                            <h1>Checklist Management</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Checklist currentUser={currentUser} />
                        </Col>
                    </Row>

                    <Modal show={showChecklistForm} onHide={handleCloseChecklistForm} dialogClassName="modal-light">
                        <Modal.Header closeButton>
                            <Modal.Title>New Checklist Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ChecklistForm
                                onChecklistItemSaved={handleChecklistItemSaved}
                                currentUser={currentUser}
                            />
                        </Modal.Body>
                    </Modal>
                </Container>
            </main>

            <footer className="bg-light py-3 mt-4">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <a href="https://www.linkedin.com/in/antonio-jurado-miranda/" target="_blank" rel="noopener noreferrer" className="mx-2 text-dark">
                                <Linkedin size={24} />
                            </a>
                            <a href="https://github.com/jurad0" target="_blank" rel="noopener noreferrer" className="mx-2 text-dark">
                                <Github size={24} />
                            </a>
                            <a href="https://www.instagram.com/fernandoalo_oficial/" target="_blank" rel="noopener noreferrer" className="mx-2 text-dark">
                                <Instagram size={24} />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
}

export default Home;
