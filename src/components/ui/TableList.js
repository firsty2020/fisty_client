import React from 'react';
import { Table } from 'react-bootstrap';
import { arrayOf, func, object, shape, string } from 'prop-types';
import { EmptyListPlaceholder, } from './index';
import { isLoadingSelector } from '../common/commonReducer';
import { connect } from 'react-redux';
import { Trash, Edit, UserMinus } from 'react-feather';


const TableList = ({
                       layout,
                       data,
                       isLoading,
                       onClickRow,
                       onDeleteItem,
                       onEditItem,
                       onUnlink,
                   }) => {
    

    if ((data && !data.length) && !isLoading) {
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
                    {layout.headings.map((heading) =>
                        <th key={heading}>{heading}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr onClick={() => onClickRow && onClickRow(item)}
                        key={index}>
                        {layout.createRow(item, index).map((value, i) =>
                            <td key={i}>{value}</td>
                        )}
                        {onEditItem || onUnlink || onDeleteItem ? (
                            <td width="5%">
                                <div className="d-flex justify-content-around cursor-pointer">
                                    {onDeleteItem ? (
                                        <Trash
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteItem(item)
                                            }}
                                            className="cursor-pointer"
                                            color="red"/>
                                    ) : null}
                                    {onEditItem ? (
                                        <Edit color="blue"
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  onEditItem(item)
                                              }}
                                              title="Редактировать"
                                        />
                                    ) : null}
                                    { onUnlink ? (
                                            <UserMinus
                                                onClick={() => onUnlink(item)}
                                                title="Удалить из контакных лиц"/>)
                                        : null }
                                </div>
                            </td>
                        ) : null}
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
