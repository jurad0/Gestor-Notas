import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

function Login() {
    const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
    const [error, setError] = useState(null); // Estado para almacenar mensajes de error
    const navigate = useNavigate(); // Hook de React Router para la navegación

    // Función para manejar el envío del formulario de inicio de sesión
    const handleLogin = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página)
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            }); // Llama a la API para intentar iniciar sesión con las credenciales proporcionadas
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.access); // Almacena el token de acceso en el almacenamiento local
                localStorage.setItem('refreshToken', response.data.refresh); // Almacena el token de refresco en el almacenamiento local
                localStorage.setItem('userLogged', username); // Almacena el nombre de usuario en el almacenamiento local
                navigate('/'); // Redirige a la página principal después de un inicio de sesión exitoso
                window.location.reload(); // Recarga la página para actualizar el estado de la aplicación
            }
        } catch (error) {
            console.error('Error during login:', error); // Muestra el error en la consola
            setError('Login failed. Please check your credentials and try again.'); // Establece un mensaje de error para mostrar en la interfaz de usuario
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100" style={{ maxWidth: '400px' }}>
                <Col>
                    <Card>
                        <Card.Body className="d-flex flex-column align-items-center">
                            <img src="src/img/Whatever_logo.png" alt="Whatever by Jurado" style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <Alert variant="danger">{error}</Alert>} {/* Muestra un mensaje de error si hay uno */}
                            <Form onSubmit={handleLogin} className="w-100">
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
                                <Button type="submit" className="w-100">Log In</Button>
                            </Form>
                            <div className="text-center mt-3">
                                <a href="/register">Don't have an account? Sign up</a> {/* Enlace para registrarse si no se tiene una cuenta */}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
