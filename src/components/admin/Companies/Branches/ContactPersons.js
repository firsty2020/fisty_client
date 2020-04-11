import React, {useEffect, useState} from 'react';
import ContactPersonsList from '../contactPerson/ContactPersonsList';
import { AlertNotice, BackButton, ConfirmationModal } from '../../../ui';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { PlusCircle, Link as LinkIcon } from 'react-feather';
import AddContactPerson from './AddContactPerson';
import {
    getContactPersons,
    linkContactPerson,
    unLinkContactPerson,
    resetContactPersonRemoved,
    resetContactPersonUnlinked,
    resetContactPersonLinked,
} from '../contactPerson/contactPersonActions';
import { connect } from 'react-redux';
import {
    contactPersonsState,
    linkContactPersonResolvedSelector,
    removeContactPersonResolvedSelector,
    unLinkContactPersonResolvedSelector
} from '../../adminReducer';
import { When } from 'react-if';
import { baseURL } from '../../../../axios';
import { generateUId } from '../../../../helpers/utils';


const uid = generateUId();


const ContactPersons = ({
                            match,
                            contactPersons,
                            contactPersonRemoved,
                            contactPersonUnlinked,
                            contactPersonLinked,
                            getContactPersons,
                            unLinkContactPerson,
                            resetContactPersonRemoved,
                            resetContactPersonUnlinked,
                            resetContactPersonLinked,
                            linkContactPerson,
                        }) => {

    const [ isAddingContactPerson, setIsAddingContactPerson ] = useState(null);
    const [ contactPersonToUnlink, setContactPersonToUnlink ] = useState(null);

    const params = { branch: match.params.branchId };

    useEffect(() => {
        updateListAndResetState();
    }, [ getContactPersons, params.branch ]);

    useEffect(() => {
        if (contactPersonRemoved || contactPersonUnlinked || contactPersonLinked) {
            updateListAndResetState(true);
        }
    }, [ contactPersonRemoved, contactPersonUnlinked, contactPersonLinked ]);

    const updateListAndResetState = (resetState = false) => {
        getContactPersons(params, uid);
        if (!resetState) return;
        if (contactPersonRemoved) {
            setTimeout(resetContactPersonRemoved, 2000);
        }
        if (contactPersonUnlinked) {
            setTimeout(resetContactPersonUnlinked, 2000)
        }
        if (contactPersonLinked) {
            setIsAddingContactPerson(false);
            setTimeout(resetContactPersonLinked, 2000);
        }
    };

    const handleModalClose = (contactPerson = null) => {
        if (!contactPerson)
            return setIsAddingContactPerson(false);
        handleLinkContactPerson(contactPerson);
    };

    const handleUnlinkContactPerson = () => {
        unLinkContactPerson({
            contact_person: contactPersonToUnlink.url,
            branch: contactPersonToUnlink.branch_url
        });
        setContactPersonToUnlink(null);
    };

    const handleLinkContactPerson = (contactPerson) => {
        linkContactPerson({
            branch: `${baseURL}companies/branch/${match.params.branchId}/`,
            contact_person: contactPerson.value
        });
    };

    return (
        <div>
            <When condition={!!contactPersonLinked}>
                <AlertNotice
                    type="success"
                    message="Вы успешно добавили контактное лицо"
                />
            </When>
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
                            variant="warning">
                            <PlusCircle
                                size={20}
                                className="align-sub"
                            /> Создать
                        </Button>
                    </Link>
                    <Button
                        onClick={() => setIsAddingContactPerson(true)}
                        variant="warning">
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
    return (state) => ({
        contactPersons: contactPersonsSelector(state),
        contactPersonRemoved: removeContactPersonResolvedSelector(state),
        contactPersonUnlinked: unLinkContactPersonResolvedSelector(state),
        contactPersonLinked: linkContactPersonResolvedSelector(state),
    });
};



const mapDispatchToProps = {
    getContactPersons,
    unLinkContactPerson,
    resetContactPersonRemoved,
    resetContactPersonUnlinked,
    resetContactPersonLinked,
    linkContactPerson,
};


export default connect(mapStateToProps, mapDispatchToProps)(ContactPersons);
