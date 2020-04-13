import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CreateButton, TableList } from '../../ui';
import { Link } from 'react-router-dom';
import { getCompanies } from './companiesActions';
import { companiesSelector } from './companiesReducer';
import './Companies.css';


const companiesTableLayout = {
    headings: [
        '#', 'Название на русском', 'Название на английском', 'Тип бизнесса',
        'Сайт',
    ],
    createRow: (company, index) => [
        index + 1, company.name, company.english_name, company.type,
        company.website,
    ],
};

const Companies = ({ companies, getCompanies, history }) => {

    useEffect(() => {
        getCompanies();
    }, [ getCompanies ]);

    const handleClickOnRow = (item) => {
        history.push(`/admin/companies/${item.id}`);
    };

    return (
        <div>
            <div className="mt-10-auto">
                <Link to="/admin/company/create">
                    <CreateButton/>
                </Link>
            </div>
            <div>
                <TableList
                    onClickRow={(item) => handleClickOnRow(item)}
                    layout={companiesTableLayout}
                    data={companies}
                />
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    companies: companiesSelector(state),
});

const mapDispatchToProps = { getCompanies, };


Companies.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Companies);
