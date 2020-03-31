import React from 'react';
import { Table } from 'react-bootstrap';
import { arrayOf, func, object, shape, string } from 'prop-types';
import { EmptyListPlaceholder, } from './index';
import {isLoadingSelector} from '../admin/adminReducer';
import { connect } from 'react-redux';


const TableList = ({ layout, data, isLoading, onClickRow }) => {

    if ((!data || !data.length) && !isLoading) {
        return <EmptyListPlaceholder/>;
    } else if (!data || !data.length) {
        return null;
    }
    return (
        <div className="cursor-pointer">
            <Table
                hover
                striped
                responsive
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
};

const mapStateToProps = (state) => ({
    isLoading: isLoadingSelector(state),
});


export default connect(mapStateToProps, null)(TableList);
