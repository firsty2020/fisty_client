import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import CompanyForm from './CompanyForm';
import { companySelector, companyUpdatedSelector } from './companiesReducer';
import { updateCompany, resetCompanyState , getCompany } from './companiesActions';
import { push } from 'connected-react-router';
import { When } from "react-if";
import { AlertNotice } from '../../ui';


const UpdateCompany = ({
                           match,
                           company,
                           updated,
                           getCompany,
                           updateCompany,
                           push,
                           resetCompanyState,
                       }) => {

    useEffect(() => {
        getCompany(match.params.companyId);
    }, [ match.params.companyId, getCompany ]);

    useEffect(() => {
        if (updated) {
            setTimeout(() => {
                push('/admin/companies');
                resetCompanyState();
            }, 2000);
        }
    }, [ updated, push, resetCompanyState ]);

    if (!company) return null;

    return (
        <div>
            <When condition={!!updated}>
                <AlertNotice message="Изменения сохранены" type="success"/>
            </When>
            <Container>
                <CompanyForm
                    onSubmit={(data) => updateCompany(match.params.companyId, data)}
                    company={company}
                />
            </Container>
        </div>
    );
};


const mapStateToProps = (state) => ({
    updated: companyUpdatedSelector(state),
    company: companySelector(state),
});

const mapDispatchToProps = {
    updateCompany, push, resetCompanyState, getCompany,
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateCompany);
