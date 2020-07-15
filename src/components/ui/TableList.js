import React from 'react';
import { Table } from 'react-bootstrap';
import { arrayOf, func, object, shape, string } from 'prop-types';
import { EmptyListPlaceholder, } from './index';
import { isLoadingSelector } from '../common/commonReducer';
import { connect } from 'react-redux';
import { Trash, Edit, UserMinus, Key, Edit3 } from 'react-feather';
import { Copy } from 'react-feather';


const TableList = ({
                       layout,
                       data,
                       isLoading,
                       onClickRow,
                       onDeleteItem,
                       onEditItem,
                       onUnlink,
                       onResetPassword,
                       onViewNotes,
                       onCopy,
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
                responsive="lg"
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
                        {onEditItem || onUnlink || onDeleteItem || onCopy? (
                            <td width="5%">
                                <div className="d-flex justify-content-around cursor-pointer">
                                    {onDeleteItem ? (
                                        <span title="Удалить">
                                            <Trash
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteItem(item);
                                                }}
                                                className="cursor-pointer"
                                                color="red"
                                            />
                                        </span>
                                    ) : null}
                                    {onEditItem ? (
                                        <span title="Редактировать">
                                            <Edit color="blue"
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      onEditItem(item);
                                                  }}
                                            />
                                        </span>) : null}
                                    { onUnlink ? (
                                        <UserMinus
                                            onClick={() => onUnlink(item)}
                                            title="Удалить из контакных лиц"/>) : null
                                    }
                                    { onResetPassword && item && item.email ? (
                                        <span title="Просмотреть заметки">
                                            <Key onClick={(e) => {
                                                e.stopPropagation();
                                                onResetPassword(item);
                                            }}/>
                                        </span>) : null
                                    }
                                    { onCopy ? (
                                        <span title="Создать копию">
                                            <Copy onClick={(e) => {
                                                e.stopPropagation();
                                                onCopy(item);
                                            }}/>
                                        </span>): null
                                    }
                                </div>
                            </td>
                        ) : null}
                        { onViewNotes ? (
                            <td width="1" className="text-center">
                                <span title="Заметки">
                                    <Edit3 onClick={(e) => {
                                        e.stopPropagation();
                                        onViewNotes(item);
                                    }}/>
                                </span>
                            </td>): null
                        }
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
