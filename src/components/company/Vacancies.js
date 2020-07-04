import React, {useEffect} from 'react';
import { Container } from 'reactstrap';
import { TableList } from '../ui';
import { extractIdFromUrl } from '../../helpers/utils';
import { connect } from 'react-redux';
import { getVacancies } from '../common/commonActions';
import { vacanciesSelector } from '../common/commonReducer';
import { push } from 'connected-react-router';


const vacanciesTableLayout = {
    headings: [
        '#', 'наименование', 'компания','дата создания',
    ],
    createRow: ({ url, name, company_details, created }) => [
        extractIdFromUrl(url),
        name,
        company_details.name,
        new Date(created).toLocaleDateString(),
    ],
};

const Vacancies = ({ match, vacancies, getVacancies, push }) => {

    useEffect(() => {
        getVacancies();
    }, [ getVacancies ]);

    return (
        <Container>
            <TableList
                onClickRow={({url}) => push(`${match.url}/${extractIdFromUrl(url)}`)}
                layout={vacanciesTableLayout}
                data={(vacancies || {}).results}
            />
        </Container>
    );
};


const mapStateToProps = (state) => ({
    vacancies: vacanciesSelector(state),
});


const mapDispatchToProps = {
    getVacancies,
    push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);

