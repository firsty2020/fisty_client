import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { companySchema } from '../../../validation';
import { Formik } from 'formik';


const CreateCompany = () => {
    return (
        <Container className="filter-container">
            <Formik
                initialValues={{
                    name: '',
                    brand: '',
                    tin: '',
                    contract_type: '-1',
                    psrn: '',
                    legal_address: '',
                    aceo: '',
                    acea: '',
                    iec: '',
                    bankDetails: {
                        name: '',
                        settlement_account: '',
                        correspondent_account: '',
                        identification_code: '',
                    },
                    subscriber_name: '',
                    subscriber_position: '',
                }}
                validationSchema={companySchema}
                onSubmit={(values) => {
                    alert('nothing will happen');
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
                        <p className="form-control-label">Полное наименование компании (Юридическое)</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Полное наименование компании (Юридическое)"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.name && errors.name ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.name}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Название компании (Бренд)</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="brand"
                                placeholder="Название компании (Бренд)"
                                value={values.brand}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.brand && errors.brand ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.brand}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">ИНН</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="tin"
                                placeholder="ИНН"
                                value={values.tin}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.tin && errors.tin ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.tin}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Тип договора</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="contract_type"
                                as="select"
                                value={values.contract_type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="тип 1">тип 1</option>
                                <option value="тип 2">тип 2</option>
                                <option value="-1" disabled>Выберите из списка</option>
                            </Form.Control>
                            {touched.contract_type && errors.contract_type ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.contract_type}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">ОГРН</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="psrn"
                                placeholder="ОГРН"
                                value={values.psrn}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.psrn && errors.psrn ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.psrn}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Юридический адрес</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="legal_address"
                                placeholder="Юридический адрес"
                                value={values.legal_address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.legal_address && errors.legal_address ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.legal_address}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">ОКПО</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="aceo"
                                placeholder="ОКПО"
                                value={values.aceo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.aceo && errors.aceo ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.aceo}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">ОКВЭД</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="acea"
                                placeholder="ОКПО"
                                value={values.acea}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.acea && errors.acea ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.acea}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">КПП</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="iec"
                                placeholder="КПП"
                                value={values.iec}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.iec && errors.iec ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.iec}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Банк организации</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="bankDetails.name"
                                placeholder="Банк организации"
                                value={values.bankDetails.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.bankDetails && touched.bankDetails.name) &&
                            (errors.bankDetails && errors.bankDetails.name) ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.bankDetails.name}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Расчетный счет организации</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="bankDetails.settlement_account"
                                placeholder="Расчетный счет организации"
                                value={values.bankDetails.settlement_account}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.bankDetails && touched.bankDetails.settlement_account) &&
                            (errors.bankDetails && errors.bankDetails.settlement_account) ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.bankDetails.settlement_account}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Корреспондентский счет банка</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="bankDetails.correspondent_account"
                                placeholder="Корреспондентский счет банка"
                                value={values.bankDetails.correspondent_account}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.bankDetails && touched.bankDetails.correspondent_account) &&
                            (errors.bankDetails && errors.bankDetails.correspondent_account) ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.bankDetails.correspondent_account}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">БИК банка</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="bankDetails.identification_code"
                                placeholder="БИК банка"
                                value={values.bankDetails.identification_code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.bankDetails && touched.bankDetails.identification_code) &&
                            (errors.bankDetails && errors.bankDetails.identification_code) ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.bankDetails.identification_code}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">ФИО Подписанта со стороны компании</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="subscriber_name"
                                placeholder="ФИО Подписанта"
                                value={values.subscriber_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.subscriber_name && errors.subscriber_name ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.subscriber_name}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Должность подписанта</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="subscriber_position"
                                placeholder="Должность подписанта"
                                value={values.subscriber_position}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.subscriber_position && errors.subscriber_position ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.subscriber_position}</span>
                            ) : null}
                        </Form.Group>
                        <div className="text-center">
                            <Button
                                type="submit">Создать
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};


export default CreateCompany;
