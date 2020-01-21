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


class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                citizenship: -1,
                country: -1,
                city: '',
            },
            phoneNumberDetails: {
                countryCode: '',
                number: '',
            }
        };
    }

    static _concatPhoneNumber(countryCode, number) {
        return countryCode + number;
    }

    handleFirstNameInput = (e) => {
        this.setState({ user: { ...this.state.user, first_name: e.target.value } });
    };

    handleLastNameInput = (e) => {
        this.setState({ user: { ...this.state.user, last_name: e.target.value } });
    };

    handleCountryCodeInput = (countryCode) => {
        this.setState({ phoneNumberDetails: { ...this.state.phoneNumberDetails, countryCode } });
    };

    handlePhoneNumberInput = (e) => {
        this.setState({ phoneNumberDetails: { ...this.state.phoneNumberDetails, number: e.target.value } });
    };

    handleEmailInput = (e) => {
        this.setState({ user: { ...this.state.user, email: e.target.value } });
    };

    handleSelectCitizenship = (e) => {
        this.setState({ user: { ...this.state.user, citizenship: e.target.value } });
    };

    handleSelectCountry = (e) => {
        this.setState({ user: { ...this.state.user, country: e.target.value } });
    };

    handleCityInput = (e) => {
        this.setState({ user: { ...this.state.user, city: e.target.value } });
    };

    handleRegisterFormSubmit = (e) => {
        e.preventDefault();
        const { user, phoneNumberDetails } = this.state;
        user.phone_number = Registration._concatPhoneNumber(phoneNumberDetails.countryCode, phoneNumberDetails.number);
        this.props.registerUser(user);
    };

    render() {

        const { user } = this.state;
        const { phoneNumberDetails } = this.state;

        return (
            <div className='registration-form-container'>
                { this.props.success ? <CheckYourEmailAlert/> : null }
                <Form onSubmit={this.handleRegisterFormSubmit}>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Имя"
                                    value={user.name}
                                    onChange={this.handleFirstNameInput}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Фамилия"
                                    value={user.last_name}
                                    onChange={this.handleLastNameInput}
                                />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <Dropdown onSelect={this.handleCountryCodeInput}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {phoneNumberDetails.countryCode ? phoneNumberDetails.countryCode : 'Код Страны'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <CountryCodeItem value="+374" imgSrc={armenianFlag}/>
                                    <CountryCodeItem value="+375" imgSrc={belorussianFlag}/>
                                    <CountryCodeItem value="+7" imgSrc={russianFlag}/>
                                    <CountryCodeItem value="+380" imgSrc={ukrainianFlag}/>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Control
                                type="tel"
                                value={phoneNumberDetails.number}
                                onChange={this.handlePhoneNumberInput}
                                placeholder="Номер Телефона"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            placeholder="Адрес Эл. Почты"
                            onChange={this.handleEmailInput}
                            value={user.email}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <CountriesDropdown
                                    value={user.citizenship}
                                    placeHolder="Гражданство"
                                    onSelectCountry={this.handleSelectCitizenship}
                                />
                            </Col>
                            <Col>
                                <CountriesDropdown
                                    value={user.country}
                                    placeHolder="Страна"
                                    onSelectCountry={this.handleSelectCountry}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Город"
                                    onChange={this.handleCityInput}
                                    value={user.city}
                                />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check label="Согласие на обработку данных" />
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        block
                        disabled={this.props.pending}
                    >
                        Зарегистрироваться
                    </Button>
                </Form>
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
