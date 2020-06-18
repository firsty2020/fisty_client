import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Accordion, Button, Card } from 'react-bootstrap';
import {ConfirmationModal, PrimaryButton} from '../../ui';
import {
    createNote,
    deleteNote,
    getNotes,
    resetNotesState
} from '../adminActions';
import {
    noteCreatedSelector,
    noteDeletedSelector,
    notesSelector
} from '../adminReducer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Trash } from 'react-feather';
import {extractIdFromUrl} from '../../../helpers/utils';

const validationSchema = Yup.object().shape({ note: Yup.string().required('Заполниите заметку') });


const NotesModal = ({
                        notes,
                        project,
                        created,
                        deleted,
                        createNote,
                        getNotes,
                        deleteNote,
                        onClose,
                        resetNotesState,
                    }) => {

    const [ noteIdToDelete, setNoteIdToDelete ] = useState(null);

    const params = { show_all: true, project: project.id };

    useEffect(() => {
        getNotes(params);
    }, [ getNotes ]);

    useEffect(() => {
        if (created || deleted) {
            getNotes(params);
            resetNotesState();
        }
    }, [ created, params ]);
    
    const handleCreateNote = (note_description) => {
        const data = {
            note_description,
            project: project.url,
        };
        createNote(data);
    };

    const handleDeleteNote = (e, id) => {
        e.stopPropagation();
        setNoteIdToDelete(id);
    };

    const onConfirmDelete = () => {
        setNoteIdToDelete(null);
        deleteNote(noteIdToDelete);
    };

    return (
      <div>
          <ConfirmationModal
              onConfirm={onConfirmDelete}
              onCancel={() => setNoteIdToDelete(null)}
              show={!!noteIdToDelete}
              question="Вы точно хотите удалитъ эту заметку?"/>
          <Modal
              show
              centered
              onHide={onClose}
          >
              <h4 className="text-center">Заметки</h4>
              <Modal.Body>
                  <Accordion
                      defaultActiveKey="0"
                      title="Нажмите, чтобы просмотретъ заметку"
                  >
                  {(notes || []).map(({ url, creator_details, note_description, }, index) => {
                      return (
                              <Card key={url}>
                                  <Card.Header className="p-0">
                                      <Accordion.Toggle
                                          as="div"
                                          eventKey={index.toString()}>
                                          <div className="d-flex justify-content-between p5-15 cursor-pointer">
                                              <span>{creator_details.first_name} {creator_details.last_name}</span>
                                              <span title="Удалитъ"
                                                    onClick={(e) => handleDeleteNote(e, extractIdFromUrl(url))}
                                              >
                                                  <Trash color="red" />
                                              </span>
                                          </div>
                                      </Accordion.Toggle>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey={index.toString()}>
                                      <Card.Body>
                                          <div>{note_description}</div>
                                      </Card.Body>
                                  </Accordion.Collapse>
                              </Card>
                      );
                  })}
                  </Accordion>
                  <Formik
                      enableReinitialize
                      initialValues={{ note: ''}}
                      validationSchema={validationSchema}
                      onSubmit={(values, { resetForm }) => {
                          handleCreateNote(values.note);
                          resetForm();
                      }}
                  >
                      {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                          <Form onSubmit={handleSubmit}>
                              <Form.Group>
                                  <Form.Control
                                      placeholder="Заметка"
                                      name="note"
                                      as="textarea"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.note}
                                  />
                                  {touched.note && errors.note ? (
                                      <p className="mt-1 invalid-feedback-visible">{errors.note}</p>
                                  ) : null}
                              </Form.Group>
                              <div className="d-flex justify-content-around mt-2">
                                  <div className="text-center">
                                      <Button
                                          onClick={onClose}
                                          className="mr-2"
                                          variant="outline-danger">Закрыть
                                      </Button>
                                      <PrimaryButton
                                          text="Создать"
                                          type="submit">
                                      </PrimaryButton>
                                  </div>
                              </div>
                          </Form>
                      )}
                  </Formik>
              </Modal.Body>
          </Modal>
      </div>
    );
};

const mapStateToProps = (state) => ({
    notes: notesSelector(state),
    created: noteCreatedSelector(state),
    deleted: noteDeletedSelector(state),
});

const mapDispatchToProps = { createNote, getNotes, deleteNote, resetNotesState };

export default connect(mapStateToProps, mapDispatchToProps)(NotesModal);
