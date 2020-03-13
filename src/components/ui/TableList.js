import React from 'react';
import { Table } from 'react-bootstrap';
import { arrayOf, bool, func, object, shape, string } from 'prop-types';
import { EmptyListPlaceholder, LoadSpinner } from './index';


const TableList = ({ layout, data, showSpinner, onClickRow }) => {


    if (showSpinner) {
        return <LoadSpinner/>
    }

    if (!data || !data.length) {
        return <EmptyListPlaceholder/>;
    }
    return (
        <div className="cursor-pointer">
            <Table
                hover
                striped
                responsive="xs"
                responsive="sm"
                responsive="md"
                responsive="lg"
                responsive="xl"
            >
                <thead>
                <tr>
                    {layout.headings.map((heading) => <th key={heading}>{heading}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr onClick={() => onClickRow && onClickRow(item)}
                        key={index}>
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
