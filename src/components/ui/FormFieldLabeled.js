import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const LabeledFieldHolder = ({ children, label, ...props }) => (
    <Form.Group
        {...props}
        className="align-items-center"
        as={Row}
    >
        <Col
            md={2}
            className="p-0 text-left"
        >
            <Form.Label>{label}</Form.Label>
        </Col>
        <Col
            md={10}
            className="text-left"
        >
            {children}
        </Col>
    </Form.Group>
);


export default LabeledFieldHolder;
