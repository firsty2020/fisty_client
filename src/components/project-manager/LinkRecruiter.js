import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { DropDown } from '../ui';
import { copyObject, generateSelectOptions, generateUId } from '../../helpers/utils';
import { connect } from 'react-redux';
import { getUsers, updateProject, resetProjectState } from '../common/commonActions';
import { isLoadingSelector, usersState, projectUpdatedSelector } from '../common/commonReducer';

const uid = generateUId();


const LinkRecruiter = ({
                           show,
                           project,
                           users,
                           pending,
                           getUsers,
                           onHide,
                       }) => {

    const [ selectedRecruiter, setSelectedRecruiter ] = useState(null);

    const params = { role: 'recruiter', 'project!': project.id, show_all: true };

    useEffect(() => {
        getUsers(params, uid);
    }, [ getUsers ]);


    const handleLinkRecruiter = () => {
        if (!project) return;
        const recruiters = copyObject(project.recruiters);
        recruiters.push(selectedRecruiter.value);
        onHide(recruiters);
    };

    return (
        <div>
            <Modal
                onHide={onHide}
                show={show}
                centered
            >
                <Modal.Body>
                    <p className="text-center mt-1">Добавить рекрутера</p>
                    <DropDown
                        name="contact_person"
                        value={selectedRecruiter}
                        onChange={(e) => setSelectedRecruiter(e)}
                        placeholder="Выберите из списка"
                        options={generateSelectOptions(
                            (users || []).results,
                            'url',
                            (selectedRecruiter) => `${selectedRecruiter.first_name} ${selectedRecruiter.last_name}`
                        )}
                    />
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button
                        onClick={() => onHide(false)}
                        variant="secondary" >Отменить</Button>
                    <Button
                        onClick={() => handleLinkRecruiter()}
                        disabled={!selectedRecruiter || pending}
                        variant="warning">Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


const mapStateToProps = (state) => ({
    users: usersState(uid)(state),
    updated: projectUpdatedSelector(state),
    pending: isLoadingSelector(state),
});

const mapDispatchToProps = {
    getUsers,
    updateProject,
    resetProjectState,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkRecruiter);
