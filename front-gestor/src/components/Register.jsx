import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

function Register() {
    const [email, setEmail] = useState(''); // Estado para almacenar el email
    const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
    const [error, setError] = useState(null); // Estado para almacenar mensajes de error
    const [success, setSuccess] = useState(null); // Estado para almacenar mensajes de éxito
    const navigate = useNavigate(); // Hook de React Router para la navegación

    // Función para manejar el envío del formulario de registro
    const handleRegister = async (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página)

        const formData = new FormData(); // Crea un nuevo objeto FormData para enviar los datos del formulario
        formData.append('email', email); // Añade el email a FormData
        formData.append('username', username); // Añade el nombre de usuario a FormData
        formData.append('password', password); // Añade la contraseña a FormData

        try {
            const response = await axios.post('http://localhost:8000/api/register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Especifica que el contenido es de tipo multipart/form-data
                }
            }); // Llama a la API para registrar un nuevo usuario
            setSuccess(`User created successfully: ${response.data.username}`); // Establece un mensaje de éxito
            setError(null); // Limpia cualquier mensaje de error
            setTimeout(() => navigate('/login'), 2000); // Redirige a la página de inicio de sesión después de 2 segundos
        } catch (error) {
            setSuccess(null); // Limpia cualquier mensaje de éxito
            if (error.response) {
                setError(error.response.data.error); // Establece el mensaje de error recibido de la API
            } else {
                setError('Error: Unable to connect to the server.'); // Establece un mensaje de error genérico si no se puede conectar al servidor
            }
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100" style={{ maxWidth: '400px' }}>
                <Col>
                    <Card>
                        <Card.Body className="d-flex flex-column align-items-center">
                            <img src="src/img/Whatever_logo.png" alt="Whatever by Jurado" style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
                            <h2 className="text-center mb-4">Register</h2>
                            {error && <Alert variant="danger">{error}</Alert>} {/* Muestra un mensaje de error si hay uno */}
                            {success && <Alert variant="success">{success}</Alert>} {/* Muestra un mensaje de éxito si hay uno */}
                            <Form onSubmit={handleRegister} className="w-100">
                                <Form.Group id="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="username" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} // Actualiza el estado del nombre de usuario
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100">Register</Button>
                            </Form>
                            <div className="text-center mt-3">
                                <a onClick={() => navigate('/login')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                    I already have an account
                                </a> {/* Enlace para navegar a la página de inicio de sesión si ya se tiene una cuenta */}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
