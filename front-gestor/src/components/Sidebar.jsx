import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../styles/sidebar.css'; // Asegúrate de crear este archivo para los estilos

function Sidebar() {
    return (
        <div className="sidebar">
            <ListGroup variant="flush">
                <ListGroup.Item action href="#class1">Clase Numero 1</ListGroup.Item>
                <ListGroup.Item action href="#class2">Clase Numero 2</ListGroup.Item>
                <ListGroup.Item action href="#class3">Clase Numero 3</ListGroup.Item>
                <ListGroup.Item action href="#class4">Clase Numero 4</ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default Sidebar;
