import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import {
    contactPersonsState,
    linkContactPersonResolvedSelector,
} from '../adminReducer';
import {
    getContactPersons,
    linkContactPerson,
    resetContactPersonLinked,
} from '../contactPerson/contactPersonActions';
import { connect } from 'react-redux';
import { generateSelectOptions, generateUId } from '../../../helpers/utils';
import { baseURL } from '../../../axios';
import { isLoadingSelector } from '../../common/commonReducer';
import { DropDown } from '../../ui';


const uid = generateUId;


const AddContactPerson = ({
                              show,
                              contactPersons,
                              params,
                              pending,
                              getContactPersons,
                              onHide,
                          }) => {

    const [ contactPerson, setContactPerson ] = useState(null);
    const [ filteredContactPersons, setFilteredContactPersons ] = useState(null);

    useEffect(() => {
        getContactPersons({ company: params.company }, uid)
    }, [ getContactPersons, params.company ]);


    useEffect(() => {
        if (contactPersons && contactPersons.length) {
            const filtered = contactPersons.filter((item) => item.branch_url !== `${baseURL}companies/branch/${params.branch}/` );
            setFilteredContactPersons(filtered);
        }
    }, [ contactPersons, params.branch]);

    if (!contactPersons) {
        return null;
    }

    return (
        <div>
            <Modal
                onHide={() => null}
                show={show}
                centered>
                <Modal.Body>
                    <p className="text-center mt-1">Добавить контактное лицо</p>
                    <DropDown
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
                        onClick={() => onHide()}
                        variant="secondary" >Отменить</Button>
                    <Button
                        onClick={() => onHide(contactPerson)}
                        disabled={!contactPerson || pending}
                        variant="warning">Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


const mapStateToProps = () => {
    const contactPersonsSelector = contactPersonsState(uid);
    return (state) => ({
        contactPersons: contactPersonsSelector(state),
        linked: linkContactPersonResolvedSelector(state),
        pending: isLoadingSelector(state),
    });
};

const mapDispatchToProps = {
    getContactPersons,
    linkContactPerson,
    resetContactPersonLinked,
};



export default connect(mapStateToProps, mapDispatchToProps)(AddContactPerson);
