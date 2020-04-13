import React, {useEffect} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { PlusCircle } from 'react-feather';
import { TableList } from '../../ui';
import { Link } from 'react-router-dom';
import { getCompanies } from './companiesActions';
import { companiesSelector } from './companiesReducer';
import './Companies.css';


const companiesTableLayout = {
    headings: [
        '#', 'Название на русском', 'Название на английском', 'Тип бизнесса',
        'Сайт',
    ],
    createRow: (company, index) => [
        index + 1, company.name, company.english_name, company.type,
        company.website,
    ],
};

const Companies = ({ companies, getCompanies, history }) => {

    useEffect(() => {
        getCompanies();
    }, [ getCompanies ]);

    const handleClickOnRow = (item) => {
        history.push(`/admin/companies/${item.id}`);
    };

    return (
        <div>
            <div className="mt-10-auto">
                <Row>
                    <Col lg={4} md={4} sm={4} xs={5}/>
                    <Col lg={4} md={4} sm={4} xs={3}/>
                    <Col lg={4} md={4} sm={4} xs={4}
                         className="d-flex justify-content-end align-items-end">
                        <Link to="/admin/company/create">
                            <Button variant="warning">
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
                    onClickRow={(item) => handleClickOnRow(item)}
                    layout={companiesTableLayout}
                    data={companies}
                />
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    companies: companiesSelector(state),
});

const mapDispatchToProps = { getCompanies, };


Companies.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Companies);
