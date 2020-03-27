import React, {useEffect, useState} from 'react';
import ContactPersonsList from '../ContactPersons/ContactPersonsList';
import { BackButton } from '../../../ui';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { PlusCircle, Link as LinkIcon } from 'react-feather';
import AddContactPerson from './AddContactPerson';
import {
    getContactPersons,
} from '../ContactPersons/contactPersonApi';
import {connect} from 'react-redux';
import {
    branchContactPersonsSelector,
    contactPersonsSelector,
    removeContactPersonResolvedSelector
} from '../../adminReducer';


const ContactPersons = ({
                            match,
                            contactPersons,
                            contactPersonRemoved,
                            getContactPersons
                        }) => {

    const [ isAddingContactPerson, setIsAddingContactPerson ] = useState(null);
    const params = { branch: match.params.branchId };

    useEffect(() => {
        getContactPersons(params);
    }, [ getContactPersons, params.branch ]);

    useEffect(() => {
        if (contactPersonRemoved) {
            getContactPersons(params);
        }
    }, [ getContactPersons, contactPersonRemoved, params.branch ]);

    const handleModalClose = (linked) => {
        setIsAddingContactPerson(false);
        if (linked) {
            getContactPersons(params);
        }
    };

    return (
        <div>
            {isAddingContactPerson ? (
                <AddContactPerson
                    show={isAddingContactPerson}
                    params={{ company: match.params.companyId, branch: match.params.branchId}}
                    onHide={(linked) => handleModalClose(linked)}
                />) : null}
            <ContactPersonsList
                contactPersons={contactPersons}
                match={match}
                params={params}
            >
                <BackButton path={`/admin/companies/${match.params.companyId}/branches/${match.params.branchId}`}/>
                <div className="mb-3">
                    <Link to={`${match.url}/create`} className="mr-2">
                        <Button
                            variant="primary">
                            <PlusCircle
                                size={20}
                                className="align-sub"
                            /> Создать
                        </Button>
                    </Link>
                    <Button
                        onClick={() => setIsAddingContactPerson(true)}
                        variant="primary">
                        <LinkIcon
                            size={20}
                            className="align-sub"
                        />Добавить
                    </Button>
                </div>
            </ContactPersonsList>
        </div>
    );
};


const mapStateToProps = () => (state, props) => ({
    contactPersons:     branchContactPersonsSelector(state, props),
    contactPersonRemoved: removeContactPersonResolvedSelector(state),
});



const mapDispatchToProps = {
    getContactPersons,
};


export default connect(mapStateToProps, mapDispatchToProps)(ContactPersons);
