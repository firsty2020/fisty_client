import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const BackButton = ({ path }) => (
    <div className="mb-3">
        <Link to={path} className="mb-4">
            <Button variant="outline-secondary">Назад</Button>
        </Link>
    </div>
);


export default BackButton;
