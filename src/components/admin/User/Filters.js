import React, { useState } from 'react';
import { DropDown } from '../../ui';
import { Accordion, Button, Col, Row } from 'react-bootstrap';
import { Sliders } from 'react-feather';
import { countriesOptions } from '../../../helpers/utils';
import { Input} from 'reactstrap';

const statusOptions = [
    { value: 'active', label: 'Активные' },
    { value: 'inactive', label: 'Неактивные' },
    { value: 'clarification', label: 'Кларификация' },
    { value: 'freeze', label: 'Замороженные' },
    { value: 'black_list', label: 'Заблокированные' },
];

const roleOptions = [
    { value: 'recruiter', label: 'Рекрутер' },
    { value: 'company', label: 'Компания' },
    { value: 'admin', label: 'Админ' },
    { value: 'project_manager', label: 'Менеджер Проекта' },
    { value: 'operator', label: 'Оператор' },
]

const subRoleOptions = [
    { value: 'internal', label: 'Внутренний' },
    { value: 'external', label: 'Внешний'},
    { value: 'free_lance', label: 'Фрилансер'},
    { value: 'agency', label: 'Агенство'},
    { value: 'contact_person', label: 'Контактное лицо'},
    { value: 'executor', label: 'Исполняющий'},
];


const Filters = ({ onFilter }) => {

    const [ filter, setFilter ] = useState({});

    const handleFilterChange = (event, filterName) => {
        let _filter = { ...filter };
        if (event && event.value) {
            _filter = { ..._filter, [filterName]: event.value };
        } else {
            delete _filter[filterName];
        }
        setFilter(_filter);
        onFilter(_filter);
    };

    const handleSearch = (e) => {
        e.persist();
        const value = e.target.value;
        let _filter = { ...filter };
        if (value) {
            _filter = { search: value };
        } else {
            delete _filter.search;
        }
        setFilter(_filter);
        onFilter(_filter);
    };

    return (
        <div>
            <Row>
                <Col md="6" lg="6" sm="8">
                    <Input
                        onChange={(e) => handleSearch(e)}
                        placeholder="Найти по телефону, эл.почте, городу"/>
                </Col>
            </Row>
            <Accordion>
                <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    className="no-decoration p-0 mb-2 mt-2"
                >
                    <span title="Фильтровать">
                        <Sliders className="filter-icon"/>
                        <span className="ml-2">Фильтровать</span>
                    </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <div>
                        <Row>
                            <Col>
                                <DropDown
                                    isClearable
                                    name="status"
                                    placeholder="Статус"
                                    onChange={(e) => handleFilterChange(e,'status')}
                                    options={statusOptions}
                                />
                            </Col>
                            <Col>
                                <DropDown
                                    isClearable
                                    name="role"
                                    placeholder="Роль"
                                    onChange={(e) => handleFilterChange(e, 'role')}
                                    options={roleOptions}
                                />
                            </Col>
                            <Col>
                                <DropDown
                                    isClearable
                                    name="sub_role"
                                    placeholder="Тип"
                                    onChange={(e) => handleFilterChange(e, 'sub_role')}
                                    options={subRoleOptions}
                                />
                            </Col>
                            <Col>
                                <DropDown
                                    isClearable
                                    name="citizenship"
                                    placeholder="Гражданство"
                                    onChange={(e) => handleFilterChange(e, 'citizenship')}
                                    options={countriesOptions}
                                />
                            </Col>
                        </Row>
                    </div>
                </Accordion.Collapse>
            </Accordion>
        </div>
    );
};


export default Filters;
