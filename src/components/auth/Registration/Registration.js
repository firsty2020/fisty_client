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
import { Formik } from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^\d+$/;

const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, "First name must have at least 2 characters")
        .required("First name is required"),
    last_name: Yup.string()
        .min(2, "Last name must have at least 2 characters")
        .required("Last name is required"),
    email: Yup.string()
        .email("Must be a valid email address")
        .max(100, "Email must be less than 100 characters")
        .required("Email is required"),
    phone_number: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone number required"),
    city: Yup.string()
        .required("City is required")
});

const initialState = {
    citizenship: -1,
    country: -1,
    countryCode: '',
    formSubmitted: false,
};

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    static _concatPhoneNumber(countryCode, number) {
        return countryCode + number;
    }

    handleCountryCodeInput = (countryCode) => {
        this.setState({ countryCode });
    };
    handleSelectCitizenship = (e) => {
        this.setState({ citizenship: e.target.value});
    };

    handleSelectCountry = (e) => {
        this.setState({ country: e.target.value });
    };

    transFormData = (values, { countryCode, country, citizenship }) => {
        const user = values;
        user.phone_number = Registration._concatPhoneNumber(countryCode, user.phone_number);
        user.country = country;
        user.citizenship = citizenship;
        return user;
    };


    render() {

        const { countryCode, citizenship, country, formSubmitted } = this.state;

        return (
            <div className="registration-form-container">
                { this.props.success ? <CheckYourEmailAlert/> : null }
                <Formik
                    initialValues={{ first_name:'', last_name:'', email:'', phone_number:'', city: ''}}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        const { citizenship, country, countryCode } = this.state;

                        if (citizenship == '-1' || country == '-1' || !countryCode) {
                            this.setState({ formSubmitted: true });
                            setSubmitting(false);
                            return;
                        }
                        const user = this.transFormData(values, { citizenship, country, countryCode });
                        this.props.registerUser(user);
                        setSubmitting(true);
                        resetForm();
                        this.setState({ ...initialState });
                        setSubmitting(false);
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
                                        {!countryCode && formSubmitted? (
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
                                            value={citizenship}
                                            placeHolder="Citizenship"
                                            onSelectCountry={this.handleSelectCitizenship}
                                        />
                                        {citizenship == '-1' && formSubmitted? (
                                            <p className="mt-1 alert-danger">Select citizenship</p>
                                        ): null}
                                    </Col>
                                    <Col>
                                        <CountriesDropdown
                                            value={country}
                                            placeHolder="Country"
                                            onSelectCountry={this.handleSelectCountry}
                                        />
                                        {country == '-1' && formSubmitted ? (
                                            <p className="mt-1 alert-danger">Select country</p>
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
