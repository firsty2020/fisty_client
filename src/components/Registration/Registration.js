import React, { Component } from 'react';
import { Button, Col, Dropdown, Form, InputGroup} from 'react-bootstrap';
import './Registration.css';
import armenianFlag from '../../assets/icons/armenia.png'
import belorussianFlag from '../../assets/icons/belorussia.png'
import russianFlag from '../../assets/icons/russia.png'
import ukrainianFlag from '../../assets/icons/ukraine.png'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                phone: '',
                email: '',
                citizenship: -1,
                country: -1,
                city: '',
            },
            phoneNumberDetails: {
                countryCode: '',
                number: ''
            }
        };
    }

    handleNameInput = (e) => {
        this.setState({ user: { ...this.state.user, name: e.target.value } });
    };

    handleCountryCodeInput = (countryCode) => {
        this.setState({ phoneNumberDetails: { ...this.state.phoneNumberDetails, countryCode } });
    };

    handlePhoneNumberInput = (e) => {
        this.setState({ phoneNumberDetails: { ...this.state.phoneNumberDetails, number: e.target.value } })
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

    render() {

        const { user } = this.state;
        const { phoneNumberDetails } = this.state;

        return (
            <div className='registration-form-container'>
                <Form>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Ф.И.О"
                            value={user.name}
                            onChange={this.handleNameInput}
                        />
                    </Form.Group>
                    <Form.Group>
                        <InputGroup >
                            <Dropdown onSelect={this.handleCountryCodeInput}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {phoneNumberDetails.countryCode ? phoneNumberDetails.countryCode : 'Код Страны'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        eventKey="+374"
                                        href="#"
                                    >
                                        <img
                                            className="country-flag-icon"
                                            src={armenianFlag}
                                        /> +374
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="+375"
                                        href="#"
                                    >
                                        <img
                                            className="country-flag-icon"
                                            src={belorussianFlag}
                                        /> +375
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="+7"
                                        href="#"
                                    >
                                        <img
                                            className="country-flag-icon"
                                            src={russianFlag}
                                        /> +7
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="+380"
                                        href="#"
                                    >
                                        <img
                                            className="country-flag-icon"
                                            src={ukrainianFlag}
                                        /> +380
                                    </Dropdown.Item>
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
                                <Form.Control
                                    value={user.citizenship}
                                    as="select"
                                    onChange={this.handleSelectCitizenship}
                                >
                                    <option value="armenia">Армениа</option>
                                    <option value="belarus">Белорусь</option>
                                    <option value="russia">Россия</option>
                                    <option value="ukraine">Украина</option>
                                    <option disabled value={-1}>Гражданство</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Control
                                    value={user.country}
                                    as="select"
                                    onChange={this.handleSelectCountry}
                                >
                                    <option value="armenia">Армениа</option>
                                    <option value="belarus">Белорусь</option>
                                    <option value="russia">Россия</option>
                                    <option value="ukraine">Украина</option>
                                    <option disabled value={-1}>Страна</option>
                                </Form.Control>
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
                    <Button variant="primary" size="lg" block>
                        Зарегистрироваться
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


export default connect(null, mapDispatchToProps)(Registration);
