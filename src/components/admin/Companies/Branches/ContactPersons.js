import React, {useEffect, useState} from 'react';
import ContactPersonsList from '../ContactPersons/ContactPersonsList';
import {AlertNotice, BackButton, ConfirmationModal} from '../../../ui';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { PlusCircle, Link as LinkIcon } from 'react-feather';
import AddContactPerson from './AddContactPerson';
import {
    getContactPersons,
    unLinkContactPerson,
} from '../ContactPersons/contactPersonApi';
import { connect } from 'react-redux';
import {
    contactPersonsState,
    removeContactPersonResolvedSelector, unLinkContactPersonResolvedSelector
} from '../../adminReducer';
import {When} from "react-if";

const uid = Math.random().toString(36).replace('0.', '');


const ContactPersons = ({
                            match,
                            contactPersons,
                            contactPersonRemoved,
                            contactPersonUnlinked,
                            getContactPersons,
                            unLinkContactPerson,
                        }) => {

    const [ isAddingContactPerson, setIsAddingContactPerson ] = useState(null);
    const [ contactPersonToUnlink, setContactPersonToUnlink ] = useState(null);

    const params = { branch: match.params.branchId };

    useEffect(() => {
        getContactPersons(params, uid);
    }, [ getContactPersons, params.branch ]);

    useEffect(() => {
        if (contactPersonRemoved || contactPersonUnlinked) {
            getContactPersons(params, uid);
        }
    }, [ getContactPersons, contactPersonRemoved, contactPersonUnlinked, params.branch ]);

    const handleModalClose = (linked) => {
        setIsAddingContactPerson(false);
        if (linked) {
            getContactPersons(params, uid);
        }
    };

    const handleUnlinkContactPerson = () => {
        unLinkContactPerson({
            contact_person: contactPersonToUnlink.url,
            branch: contactPersonToUnlink.branch_url
        });
        setContactPersonToUnlink(null);
    };

    return (
        <div>
            <When condition={!!contactPersonUnlinked}>
                <AlertNotice
                    type="success"
                    message="Вы успешно удалили контактное лицо из списка"
                />
            </When>
            <ConfirmationModal
                show={!!contactPersonToUnlink}
                onConfirm={handleUnlinkContactPerson}
                onCancel={() => setContactPersonToUnlink(null)}
                question="Вы уверены что хотите удалить это контактное лицо из списка контактных лиц?"
            />
            {isAddingContactPerson ? (
                <AddContactPerson
                    show={isAddingContactPerson}
                    params={{ company: match.params.companyId, branch: match.params.branchId}}
                    onHide={(linked) => handleModalClose(linked)}
                />) : null}
            <ContactPersonsList
                onUnlinkContactPerson={setContactPersonToUnlink}
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


const mapStateToProps = () => {
    const contactPersonsSelector = contactPersonsState(uid);
    return (state, props) => ({
        contactPersons: contactPersonsSelector(state),
        contactPersonRemoved: removeContactPersonResolvedSelector(state),
        contactPersonUnlinked: unLinkContactPersonResolvedSelector(state),
    });
};



const mapDispatchToProps = {
    getContactPersons,
    unLinkContactPerson,
};


export default connect(mapStateToProps, mapDispatchToProps)(ContactPersons);
