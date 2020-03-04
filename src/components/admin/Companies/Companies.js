import React, {useEffect} from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { PlusCircle } from 'react-feather';
import { EmptyListPlaceholder, TableList } from '../../ui';
import { Link } from 'react-router-dom';
import { getCompanies } from './companiesApi';
import { companiesSelector } from '../adminReducer';
import { When } from 'react-if';


const companiesTableLayout = {
    headings: [
        '#', 'Название на русском', 'Название на английском', 'Тип бизнесса',
        'Сайт', 'Источник'
    ],
    createRow: (company, index) => [
        index + 1, company.name, company.english_name, company.type,
        company.website, company.source,
    ],
};

const Companies = ({ companies, getCompanies }) => {

    useEffect(() => {
        getCompanies();
    }, [ getCompanies ]);


    return (
        <div>
            <div className="mt-10-auto">
                <Row>
                    <Col lg={4} md={4} sm={4} xs={5}>
                        <Form.Label>Фильтровать по статусу</Form.Label>
                        <Form.Control
                            name="filter"
                            as="select"
                        >
                            <option value="active">Активные</option>
                            <option value="inactive">Неактивные</option>
                            <option value="black_list">Блек Лист</option>
                            <option value="all">Все</option>
                        </Form.Control>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={3}/>
                    <Col lg={4} md={4} sm={4} xs={4}
                         className="d-flex justify-content-end align-items-end">
                        <Link to="/admin/companies/create">
                            <Button variant="primary">
                                <PlusCircle
                                    size={20}
                                    className="align-sub"
                                /> Создать
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </div>
            <div>
                <TableList
                    layout={companiesTableLayout}
                    data={companies || []}
                />
            </div>
            <When condition={(!companies || !companies.length)}>
                <EmptyListPlaceholder/>
            </When>
        </div>
    );
};


const mapStateToProps = state => ({
    companies: companiesSelector(state),
});

const mapDispatchToProps = { getCompanies };


Companies.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Companies);
