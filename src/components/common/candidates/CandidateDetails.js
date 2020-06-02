import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BackButton, DetailsTable } from '../../ui';
import { getCandidate } from '../commonActions';
import { candidateSelector } from '../commonReducer';
import { sliceFromLastSlash } from '../../../helpers/utils';


const CandidateDetails = ({ match, candidate, getCandidate }) => {

    useEffect(() => {
        getCandidate(match.params.candidateId);
    }, [ match.params.candidateId, getCandidate ]);

    if (!candidate) {
        return null;
    }

    const generateDetails = () => {
        return candidate.candidate_fields.reduce((acc, curr) => {
            acc.push({ title: curr.field, value: curr.file_value || curr.value });
            return acc;
        }, []);
    };

    return (
        <div>
            <BackButton path={sliceFromLastSlash(match.url)} />
            <DetailsTable
                data={generateDetails()}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    candidate: candidateSelector(state),
});

const mapDispatchToProps = {
    getCandidate,
};


export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetails);
