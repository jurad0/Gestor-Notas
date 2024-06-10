import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { fetchTasks, deleteTask } from '../api';
import { Download, Trash, Pencil } from 'react-bootstrap-icons';

function TaskList({ onSelectTask }) {
    const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
    const [sortOption, setSortOption] = useState('date'); // Estado para almacenar la opción de ordenación
    const currentUser = localStorage.getItem('userLogged'); // Obtiene el usuario actual del almacenamiento local

    // useEffect para cargar las tareas cuando se monta el componente o cambia el usuario actual
    useEffect(() => {
        fetchTasks(currentUser)
            .then(data => {
                console.log("Tasks fetched:", data);
                setTasks(data); // Actualiza el estado con las tareas recibidas
            })
            .catch(error => console.error('Error fetching tasks:', error)); // Manejo de errores en caso de fallo
    }, [currentUser]);

    // Función para manejar la eliminación de una tarea
    const handleDelete = async (title) => {
        try {
            await deleteTask(title, currentUser); // Llama a la API para eliminar la tarea
            setTasks(tasks.filter(task => task.title !== title)); // Actualiza el estado eliminando la tarea
        } catch (error) {
            console.error('Error deleting task:', error); // Manejo de errores en caso de fallo
        }
    };

    // Función para renderizar el contenido multimedia de una tarea
    const renderMedia = (task) => {
        if (task.photo_url) {
            return (
                <div className="col-md-4">
                    <img src={task.photo_url} alt="Task" className="img-fluid rounded-start" /> {/* Renderiza la imagen de la tarea */}
                </div>
            );
        } else if (task.video_url) {
            return (
                <div className="col-md-4">
                    <iframe
                        width="100%"
                        height="315"
                        src={task.video_url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe> {/* Renderiza el video de la tarea */}
                </div>
            );
        }
        return null; // Si no hay contenido multimedia, no renderiza nada
    };

    // Función para ordenar las tareas según la opción seleccionada
    const sortTasks = (tasks, option) => {
        if (option === 'date') {
            return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Ordena las tareas por fecha de creación
        } else if (option === 'alphabetical') {
            return tasks.sort((a, b) => a.title.localeCompare(b.title)); // Ordena las tareas alfabéticamente por título
        }
        return tasks; // Devuelve las tareas sin ordenar si la opción no es válida
    };

    return (
        <>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Sort by:</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as="select"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)} // Actualiza la opción de ordenación
                    >
                        <option value="date">Date</option>
                        <option value="alphabetical">Alphabetical</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            <Row>
                {sortTasks(tasks, sortOption).map(task => (
                    <Col key={task.title} md={6} lg={6} className="mb-4">
                        <Card className=" h-100 mb-3" style={{ maxWidth: '540px' }}>
                            <Row className="g-0">
                                {renderMedia(task)} {/* Renderiza el contenido multimedia de la tarea */}
                                <div className={task.photo_url || task.video_url ? "col-md-8" : "col-md-12"}>
                                    <Card.Body className="mb-3">
                                        <Card.Title>{task.title}</Card.Title>
                                        <Card.Text>{task.description}</Card.Text>
                                        {task.pdf && (
                                            <p>
                                                <Button variant="info" href={task.pdf} target="_blank" rel="noopener noreferrer">
                                                    <Download className="me-1" /> Download File {/* Botón para descargar el archivo PDF */}
                                                </Button>
                                            </p>
                                        )}
                                        <Button variant="danger" onClick={() => handleDelete(task.title)} className="me-2">
                                            <Trash className="me-1" /> Delete {/* Botón para eliminar la tarea */}
                                        </Button>
                                        <Button variant="primary" onClick={() => onSelectTask(task)}>
                                            <Pencil className="me-1" /> Edit {/* Botón para editar la tarea */}
                                        </Button>
                                    </Card.Body>
                                </div>
                            </Row>
                            <Card.Footer className="text-muted">
                                Created on: {new Date(task.created_at).toLocaleDateString()} {/* Muestra la fecha de creación de la tarea */}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default TaskList;
