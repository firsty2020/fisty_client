import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import {
    contactPersonsSelector, excludeBranchContactPersons,
    linkContactPersonPendingSelector,
    linkContactPersonResolvedSelector,
} from '../../adminReducer';
import { getContactPersons, linkContactPerson } from '../ContactPersons/contactPersonApi';
import { connect } from 'react-redux';
import { generateSelectOptions } from '../../../../helpers/utils';
import { baseURL } from '../../../../axios';
import { AlertNotice } from '../../../ui';
import { When } from "react-if";



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

    useEffect(() => {
        getContactPersons({ company: params.company })
    }, [ getContactPersons, params.company ]);

    useEffect(() => {
        if (linked) {
            setTimeout(onHide.bind(null, true), 2000);
        }
    }, [ linked, onHide ]);

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
                            contactPersons,
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


const mapStateToProps = () => (state, props) => ({
    contactPersons: excludeBranchContactPersons(state, props),
    linked: linkContactPersonResolvedSelector(state),
    pending: linkContactPersonPendingSelector(state),
});

const mapDispatchToProps = {
    getContactPersons,
    linkContactPerson,
};



export default connect(mapStateToProps, mapDispatchToProps)(AddContactPerson);
