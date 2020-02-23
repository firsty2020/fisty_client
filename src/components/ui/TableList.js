import React from 'react';
import { Table } from 'react-bootstrap';
import {arrayOf, func, object, shape, string} from 'prop-types';


const TableList = ({ layout, data }) => {
    return (
        <Table
            striped
            responsive="md"
            responsive="lg"
            responsive="xs"
            responsive="sm"
            responsive="xl"
        >
            <thead>
                <tr>
                    {layout.headings.map((heading) => <th key={heading}>{heading}</th>)}
                </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {layout.createRow(item, index).map((value, i) =>
                        <td key={i}>{value}</td>
                    )}
                </tr>
            ))}
            </tbody>
        </Table>
    )
};

TableList.propTypes = {
    layout: shape({
        headings: arrayOf(string).isRequired,
        createRow: func.isRequired,
    }).isRequired,
    data: arrayOf(object).isRequired,
};


export default TableList;
