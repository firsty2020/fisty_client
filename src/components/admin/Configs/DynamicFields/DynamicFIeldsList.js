import React from 'react';
import { Table } from 'react-bootstrap';
import { Edit, Trash } from 'react-feather';
import { extractIdFromUrl } from '../../../../helpers/utils';


const DynamicFieldsList = ({ data, onDelete, onEdit }) => {
    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>Наименование</th>
                    <th width="5%">Действия</th>
                </tr>
                </thead>
                <tbody>
                {(data || []).map((field) => (
                    <tr key={field.url}>
                        <td>{field.name}</td>
                        <td>
                            <div className="d-flex justify-content-around">
                                <Trash
                                    onClick={() => onDelete(extractIdFromUrl(field.url))}
                                    className="cursor-pointer"
                                    color="red"
                                />
                                <Edit
                                    onClick={() => onEdit(field)}
                                    className="cursor-pointer"
                                    color="blue"
                                />
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};


export default DynamicFieldsList;
