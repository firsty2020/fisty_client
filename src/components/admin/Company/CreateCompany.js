import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createCompany, resetCompanyState } from './companiesActions';
import { createCompanyResolvedSelector } from './companiesReducer';
import { AlertNotice } from '../../ui';
import { When } from 'react-if';
import messages from '../../../helpers/constants/messages';
import CompanyForm from './CompanyForm';


const CreateCompany = ({ created, createCompany, push, resetCompanyState }) => {

    useEffect(() => {
        if (created) {
            setTimeout(() => {
                push('/admin/companies');
                resetCompanyState();
            }, 2000);
        }
    }, [ created, push, resetCompanyState ]);

    return (
        <Container className="mt-10-auto">
            <When condition={!!created}>
                <AlertNotice message={messages.COMPANY_CREATED_SUCCESS} type="success"/>
            </When>
            <CompanyForm onSubmit={(data) => createCompany(data)}/>
        </Container>
    );
};


const mapStateToProps = state => ({
    created: createCompanyResolvedSelector(state),
});

const mapDispatchToProps = {
    createCompany,
    push,
    resetCompanyState,
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateCompany);
