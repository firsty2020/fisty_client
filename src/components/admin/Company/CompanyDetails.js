import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { companySelector } from './companiesReducer';
import { getCompany } from './companiesActions';
import { connect } from 'react-redux';
import {
    industryOptionSelector,
    specificationOptionSelector,
} from '../Config/configsReducer';
import { getIndustryOption, getSpecificationOption } from '../Config/configsApi';
import { extractIdFromUrl } from '../../../helpers/utils';
import {BackButton, DetailsTable, PrimaryButton} from '../../ui';


const companyDetailsTableLayout = ({
                                       id,
                                       name,
                                       english_name,
                                       type,
                                       contact_number,
                                       website,
                                       social_link,
                                       source,
}) => [
    { title: 'ID',                      value: id },
    { title: 'Название',                value: name },
    { title: 'Название на английском',  value: english_name },
    { title: 'Тип бизнеса',             value: type },
    { title: 'Контактный номер',        value: contact_number },
    { title: 'Сайт',                    value: website },
    { title: 'Соц. сети',               value: social_link },
    { title: 'Источник',                value: source },
];


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
    }, [ getCompany, match.params.companyId ]);

    useEffect(() => {
        if (!company) return;
        const industryId = extractIdFromUrl(company.industry);
        const specificationId = extractIdFromUrl(company.specification);
        industryId && getIndustryOption(industryId);
        specificationId && getSpecificationOption(specificationId);
    }, [ getIndustryOption, getSpecificationOption, company ]);

    if (!company) {
        return null;

    }

    return (
        <div>
            <BackButton path="/admin/companies" />
            <DetailsTable
                data={companyDetailsTableLayout(company)}
            >
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
            </DetailsTable>
            <Link to={`${match.url}/contact-persons`}
                  className="mr-2">
                <Button
                    onClick={() => null}
                    variant="warning">Контактные лица
                </Button>
            </Link>
            <Link to={`${match.url}/applications`}
                  className="mr-2">
                <PrimaryButton text="Заявки"/>
            </Link>
            <Link to={`${match.url}/branches`}
                  className="mr-2">
                <PrimaryButton text="Бранчи"/>
            </Link>
            <Link to={`${match.url}/projects`}>
                <PrimaryButton text="Проекты (experimental)"/>
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
