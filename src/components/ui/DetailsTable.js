import React from 'react';
import Table from 'react-bootstrap/Table';


const DetailsTable = ({ data, children }) => (
    <div>
        <Table
            responsive
            className="details-table"
        >
            <tbody>
            {(data || []).map(({ title, value }) => (
                <tr key={title}>
                    <td>{title}</td>
                    <td>{value}</td>
                </tr>
            ))}
            {children}
            </tbody>
        </Table>
    </div>
);



export default DetailsTable;
