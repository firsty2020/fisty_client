import React, {useEffect} from 'react';
import ContactPersonsList from './ContactPersons/ContactPersonsList';
import { BackButton } from '../../ui';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { PlusCircle } from 'react-feather';
import {
    contactPersonsSelector,
    removeContactPersonResolvedSelector,
} from '../adminReducer';
import {
    getContactPersons,
    resetContactPersonRemoved
} from './ContactPersons/contactPersonActions';
import { connect } from 'react-redux';


const ContactPersons = ({
                            match,
                            contactPersons,
                            contactPersonRemoved,
                            getContactPersons,
                            resetContactPersonRemoved,
                        }) => {

    const params = { company: match.params.companyId };

    useEffect(() => {
        getContactPersons(params);
    }, [ getContactPersons, params.branch ]);

    useEffect(() => {
        if (contactPersonRemoved) {
            getContactPersons(params);
            resetContactPersonRemoved();
        }
    }, [ getContactPersons, contactPersonRemoved, params.company ]);

    return (
        <div>
            <ContactPersonsList
                contactPersons={contactPersons}
                match={match}
                params={params}
            >
                <BackButton path={`/admin/companies/${params.company}`}/>
                <div className="mb-3">
                    <Link to={`${match.url}/create`}>
                        <Button
                            variant="warning">
                            <PlusCircle
                                size={20}
                                className="align-sub"
                            /> Создать
                        </Button>
                    </Link>
                </div>
            </ContactPersonsList>
        </div>
    );
};


const mapStateToProps = () => {
    return (state, props) => ({
        contactPersons: contactPersonsSelector(state),
        contactPersonRemoved: removeContactPersonResolvedSelector(state),
    });
};

const mapDispatchToProps = {
    getContactPersons,
    resetContactPersonRemoved,
};


export default connect(mapStateToProps, mapDispatchToProps)(ContactPersons);
