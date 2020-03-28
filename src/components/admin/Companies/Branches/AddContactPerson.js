import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import {
    contactPersonsState,
    linkContactPersonPendingSelector,
    linkContactPersonResolvedSelector,
} from '../../adminReducer';
import { getContactPersons, linkContactPerson } from '../ContactPersons/contactPersonApi';
import { connect } from 'react-redux';
import { generateSelectOptions } from '../../../../helpers/utils';
import { baseURL } from '../../../../axios';
import { AlertNotice } from '../../../ui';
import { When } from "react-if";


const uid = Math.random().toString(36).replace('0.', '');


const AddContactPerson = ({
                              show,
                              contactPersons,
                              params,
                              linked,
                              getContactPersons,
                              linkContactPerson,
                              onHide,
                          }) => {

    const [ contactPerson, setContactPerson ] = useState(null);
    const [ filteredContactPersons, setFilteredContactPersons ] = useState(null);

    useEffect(() => {
        getContactPersons({ company: params.company }, uid)
    }, [ getContactPersons, params.company ]);

    useEffect(() => {
        if (linked) {
            setTimeout(onHide.bind(null, true), 2000);
        }
    }, [ linked, onHide ]);
    
    useEffect(() => {
        if (contactPersons && contactPersons.length) {
            const filtered = contactPersons.filter((item) => item.branch_url !== `${baseURL}companies/branch/${params.branch}/` );
            setFilteredContactPersons(filtered);
        }
    }, [ contactPersons, params.branch]);

    const handleAddContactPerson = () => {
        linkContactPerson({
            branch: `${baseURL}companies/branch/${params.branch}/`,
            contact_person: contactPerson.value
        });
    };

    if (!contactPersons) {
        return null;
    }

    return (
        <div>
            <When condition={!!linked}>
                <AlertNotice
                    type="success"
                    message="Вы успешно добавили контактное лицо"
                />
            </When>
            <Modal
                onHide={onHide}
                show={show}
                centered>
                <Modal.Body>
                    <p className="text-center mt-1">Добавить контактное лицо</p>
                    <Select
                        name="contact_person"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e)}
                        placeholder="Выберите из списка"
                        options={generateSelectOptions(
                            filteredContactPersons,
                            'url',
                            (contactPerson) => `${contactPerson.first_name} ${contactPerson.last_name}`
                        )}
                    />
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button
                        onClick={onHide}
                        variant="secondary" >Отменить</Button>
                    <Button
                        onClick={handleAddContactPerson}
                        disabled={!contactPerson}
                        variant="primary">Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


const mapStateToProps = () => {
    const contactPersonsSelector = contactPersonsState(uid);
    return (state, props) => ({
        contactPersons: contactPersonsSelector(state),
        linked: linkContactPersonResolvedSelector(state),
        pending: linkContactPersonPendingSelector(state),
    });
};

const mapDispatchToProps = {
    getContactPersons,
    linkContactPerson,
};



export default connect(mapStateToProps, mapDispatchToProps)(AddContactPerson);
