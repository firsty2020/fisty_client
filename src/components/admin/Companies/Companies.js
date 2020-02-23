import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { PlusCircle } from 'react-feather';
import { EmptyListPlaceholder, TableList } from '../../ui';
import {Link} from 'react-router-dom';


const companiesTableLayout = {
    headings: [
        '#', 'ID', 'Дата Создания', 'Полное наименование компании (Юридическое)',
        'Название компании (Бренд)', 'ИНН'
    ],
    createRow: () => [

    ],
};

const Companies = () => {

    return (
        <div>
            <div className="filter-container">
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
                    data={[]}
                />
            </div>
            <EmptyListPlaceholder/>
        </div>
    );
};


const mapStateToProps = state => ({

});

const mapDispatchToProps = {  };


Companies.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Companies);
