import React, {useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { companySelector } from './companiesReducer';
import { getCompany } from './companiesApi';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import {
    industryOptionSelector,
    specificationOptionSelector,
} from '../Configs/configsReducer';
import { getIndustryOption, getSpecificationOption } from '../Configs/configsApi';
import { extractIdFromUrl } from '../../../helpers/utils';


const CompanyDetails = ({
                            match,
                            company,
                            industry,
                            specification,
                            getCompany,
                            getIndustryOption,
                            getSpecificationOption,
}) => {

    useEffect(() => {
        getCompany(match.params.companyId);
    }, [ getCompany, match ]);

    useEffect(() => {
        if (!company) return;
        const industryId = extractIdFromUrl(company.industry);
        const specificationId = extractIdFromUrl(company.specification);
        industryId && getIndustryOption(industryId);
        specificationId && getSpecificationOption(specificationId);
    }, [ company, getIndustryOption, getSpecificationOption ]);

    if (!company) {
        return null;
    }

    return (
        <div>
            <div>
                <Table responsive className="company-details-table">
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{company.id}</td>
                        </tr>
                        <tr>
                            <td>Название</td>
                            <td>{company.name}</td>
                        </tr>
                        <tr>
                            <td>Название на английском</td>
                            <td>{company.english_name}</td>
                        </tr>
                        <tr>
                            <td>Тип бизнеса</td>
                            <td>{company.type}</td>
                        </tr>
                        {industry ?
                         <tr>
                             <td>Индустрия</td>
                             <td>{industry.name}</td>
                         </tr> : null
                        }
                        {specification ?
                            <tr>
                                <td>Специфика</td>
                                <td>{specification.name}</td>
                            </tr> : null
                        }
                        <tr>
                            <td>Контактный номер</td>
                            <td>{company.contact_number}</td>
                        </tr>
                        <tr>
                            <td>Сайт</td>
                            <td className="bold">{company.website}</td>
                        </tr>
                        <tr>
                            <td>Соц. сети</td>
                            <td className="bold">{company.social_link}</td>
                        </tr>
                        <tr>
                            <td>Источник</td>
                            <td className="bold">{company.source}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Link to={`${match.url}/contact-persons`}>
                <Button
                    onClick={() => null}
                    variant="primary">Контактные лица
                </Button>
            </Link>
        </div>
    );

};


const mapStateToProps = state => ({
    company: companySelector(state),
    industry: industryOptionSelector(state),
    specification: specificationOptionSelector(state),
});

const mapDispatchToProps = {
    getCompany,
    getIndustryOption,
    getSpecificationOption
};


CompanyDetails.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
