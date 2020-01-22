import React, { Component } from 'react';
import { Button, Col, Dropdown, Form, InputGroup} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { registerUser } from '../auth';
import CountriesDropdown from './CountriesDropdown';
import CountryCodeItem from './CountryCodeItem';
import CheckYourEmailAlert from './CheckYourEmailAlert';
import './Registration.css';
import armenianFlag from '../../../assets/icons/armenia.png'
import belorussianFlag from '../../../assets/icons/belorussia.png'
import russianFlag from '../../../assets/icons/russia.png'
import ukrainianFlag from '../../../assets/icons/ukraine.png'
import { authPending, authFailed, authSucceed } from '../authReducer';
import { userRegistrationSchema } from '../../../validation';
import { Formik } from 'formik';


class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countryCode: '',
            countryCodeError: false,
        };
        localStorage.clear();
    }

    static _concatPhoneNumber(countryCode, number) {
        return countryCode + number;
    }

    handleCountryCodeInput = (countryCode)  => this.setState({ countryCode });
    
    render() {

        const { countryCode, countryCodeError } = this.state;

        return (
            <div className="registration-form-container">
                { this.props.success ? <CheckYourEmailAlert/> : null }
                <Formik
                    initialValues={ {
                        first_name:'',
                        last_name:'',
                        email:'',
                        phone_number:'',
                        city: '',
                        country: -1,
                        citizenship: -1,
                    }}
                    validationSchema={userRegistrationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (!this.state.countryCode) {
                            this.setState({ countryCodeError: true });
                            setSubmitting(false);
                            return;
                        }
                        const user = { ...values };
                        user.phone_number = Registration._concatPhoneNumber(countryCode, user.phone_number);
                        this.props.registerUser(user);
                        setSubmitting(true);
                    }}
                >
                    {( {values,
                           errors,
                           touched,
                           handleChange,
                           handleBlur,
                           handleSubmit,
                       }) => (
                        <Form onSubmit={handleSubmit} className="mx-auto">
                            <Form.Group>
                                <Form.Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            name="first_name"
                                            value={values.first_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.first_name && errors.first_name ? (
                                            <p className="mt-1 alert-danger">{errors.first_name}</p>
                                        ): null}
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                            value={values.last_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.last_name && errors.last_name ? (
                                            <p className="mt-1 alert-danger">{errors.last_name}</p>
                                        ): null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={touched.email && errors.email ? "error" : null}
                                />
                                {touched.email && errors.email ? (
                                    <p className="mt-1 alert-danger">{errors.email}</p>
                                ): null}
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <Dropdown onSelect={this.handleCountryCodeInput}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {countryCode ? countryCode : 'Country Code'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <CountryCodeItem value="+374" imgSrc={armenianFlag}/>
                                            <CountryCodeItem value="+375" imgSrc={belorussianFlag}/>
                                            <CountryCodeItem value="+7" imgSrc={russianFlag}/>
                                            <CountryCodeItem value="+380" imgSrc={ukrainianFlag}/>
                                        </Dropdown.Menu>
                                        {!countryCode && countryCodeError ? (
                                            <p className="mt-1 alert-danger">Select country code</p>
                                        ): null}
                                    </Dropdown>
                                    <Form.Control
                                        type="tel"
                                        value={values.phone_number}
                                        name="phone_number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Phone Number"
                                    />
                                </InputGroup>
                                {touched.phone_number && errors.phone_number ? (
                                    <p className="mt-1 alert-danger">{errors.phone_number}</p>
                                ): null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Row>
                                    <Col>
                                        <CountriesDropdown
                                            value={values.citizenship}
                                            name="citizenship"
                                            placeHolder="Citizenship"
                                            onBlur={handleBlur}
                                            onSelectCountry={handleChange}
                                        />
                                        {touched.citizenship && errors.citizenship ? (
                                            <p className="mt-1 alert-danger">{errors.citizenship}</p>
                                        ): null}
                                    </Col>
                                    <Col>
                                        <CountriesDropdown
                                            value={values.country}
                                            name="country"
                                            placeHolder="Country"
                                            onBlur={handleBlur}
                                            onSelectCountry={handleChange}
                                        />
                                        {touched.country && errors.country ? (
                                            <p className="mt-1 alert-danger">{errors.country}</p>
                                        ): null}
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="City"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="city"
                                            value={values.city}
                                        />
                                        {touched.city && errors.city ? (
                                            <p className="mt-1 alert-danger">{errors.city}</p>
                                        ): null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Button
                                variant="primary"
                                size="lg"
                                block
                                type="submit" disabled={this.props.pending}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pending: authPending(state),
    error: authFailed(state),
    success: authSucceed(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ registerUser }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Registration);
