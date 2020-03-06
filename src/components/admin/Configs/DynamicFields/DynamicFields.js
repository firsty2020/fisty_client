import React from 'react';
import { Container } from 'react-bootstrap';
import Industries from './Industries';
import Specifications from './Specifications';

const DynamicFields = () => (
    <Container className="mt-10-auto">
        <Industries/>
        <Specifications/>
    </Container>
);


export default DynamicFields;
