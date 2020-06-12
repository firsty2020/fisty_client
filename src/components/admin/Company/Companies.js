import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    AlertNotice,
    ConfirmationModal,
    CreateButton,
    TableList,
} from '../../ui';
import { Link } from 'react-router-dom';
import {
    deleteCompany,
    getCompanies,
    resetCompanyState,
} from './companiesActions';
import { companiesSelector, companyDeletedSelector } from './companiesReducer';
import './Companies.css';
import Pagination from '../../Pagination';
import { autoToggleAlert } from '../../../helpers/utils';
import { When } from 'react-if';
import { push } from 'connected-react-router';


const companiesTableLayout = {
    headings: [
        '#', 'Название на русском', 'Название на английском', 'Тип бизнесса',
        'Сайт', 'Действия',
    ],
    createRow: ({ id, name, english_name, type, website }) => [
        id, name, english_name, type, website,
    ],
};

const Companies = ({
                       companies,
                       deleted,
                       history,
                       getCompanies,
                       deleteCompany,
                       resetCompanyState,
                       push,
                   }) => {

    const [ companyIdToDelete, setCompanyIdToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {
        getCompanies();
    }, [ getCompanies ]);

    useEffect(() => {
        if (deleted) {
            resetCompanyState();
            getCompanies();
            autoToggleAlert('Вы успешно удалили компанию', setSuccessMessage);
        }
    })

    const handleClickOnRow = (item) => {
        history.push(`/admin/companies/${item.id}`);
    };

    const handleDeleteCompany = () => {
        deleteCompany(companyIdToDelete);
        setCompanyIdToDelete(null);
    };

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice
                    type="success"
                    message={successMessage}
                />
            </When>
            <ConfirmationModal
                onCancel={() => setCompanyIdToDelete(null)}
                onConfirm={handleDeleteCompany}
                show={!!companyIdToDelete}
                question="Вы точно хотите удалить компанию из системы? Восстановить ее будет невозможно."
            />
            <div className="mt-10-auto">
                <Link to="/admin/company/create">
                    <CreateButton/>
                </Link>
            </div>
            <div>
                <TableList
                    onEditItem={({ id }) => push(`/admin/companies/${id}/edit`)}
                    onDeleteItem={({ id }) => setCompanyIdToDelete(id)}
                    onClickRow={(item) => handleClickOnRow(item)}
                    layout={companiesTableLayout}
                    data={(companies || {}).results}
                />
            </div>
            <Pagination
                action={getCompanies}
                data={companies}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    companies: companiesSelector(state),
    deleted: companyDeletedSelector(state),
});

const mapDispatchToProps = { getCompanies, deleteCompany, resetCompanyState, push };


export default connect(mapStateToProps, mapDispatchToProps)(Companies);
