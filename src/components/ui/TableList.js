import React from 'react';
import { Table } from 'react-bootstrap';
import {arrayOf, bool, func, object, shape, string} from 'prop-types';
import {EmptyListPlaceholder, LoadSpinner} from './index';
import {When} from "react-if";


const TableList = ({ layout, data, showSpinner }) => {

    if (showSpinner) {
        return <LoadSpinner/>
    }

    if (!data || !data.length) {
        return <EmptyListPlaceholder/>;
    }
    return (
        <div>
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
        </div>
        );

};


TableList.propTypes = {
    layout: shape({
        headings: arrayOf(string).isRequired,
        createRow: func.isRequired,
    }).isRequired,
    data: arrayOf(object),
    showSpinner: bool.isRequired,
};


export default TableList;
