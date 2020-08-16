import { DropDown } from '../../ui';
import {extractIdFromUrl, generateSelectOptions} from '../../../helpers/utils';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { flowStatusesSelector } from '../../admin/Config/configsReducer';
import { getFlowStatuses } from '../../admin/Config/configsActions';
import { resetProjectState, updateProject } from '../commonActions';
import { projectUpdatedSelector } from '../commonReducer';

const UpdateProjectStatus = ({
                                 project,
                                 statuses,
                                 getFlowStatuses,
                                 updateProject,
                                 updated,
                                 projectUpdated,
                                 resetProjectState,
                             }) => {

    const params = { flow: extractIdFromUrl(project.flow), show_all: true };

    const [ status, setStatus ] = useState(null);
    const [ projectStatus, setProjectStatus ] = useState(null);

    useEffect(() => {
        if (!project) return ;
        getFlowStatuses(params);
    }, [ getFlowStatuses ]);

    useEffect(() => {
        if (!statuses || !statuses.results || status) return ;
        const _projectStatus = statuses.results.find(({url}) => url === project.flow_status);
        _projectStatus.name = _projectStatus.main_status_details.name;
        setProjectStatus(_projectStatus);
        setStatus({value: _projectStatus.url, label: _projectStatus.name});
    });

    useEffect(() => {
        if (projectUpdated) {
            updated();
            resetProjectState();
            const _projectStatus = statuses.results.find(({url}) => url === project.flow_status);
            _projectStatus.name = _projectStatus.main_status_details.name;
            setProjectStatus(_projectStatus);
        }
    }, [projectUpdated, updated, resetProjectState]);


    if (!statuses || !statuses.results || !projectStatus || !project) return null;


    const generateStatuses = () => {
        return project.flow_status_details.available_statuses
            .reduce((acc, curr) => {
                const _status = statuses.results.find(({url}) => url === curr);
                if (_status) {
                    _status.name = _status.main_status_details.name;
                    acc.push(_status);
                }
                return acc;
            },[]);
    };

    const handleUpdateStatus = (e) => {
        setStatus(e);
        if (e.value === project.flow_status) return ;
        updateProject(project.id, {flow_status: e.value});
    }

    return (
        <div style={{width: '200px'}}
            onClick={(e) => e.stopPropagation()}>
            <DropDown
                className="select-status"
                name="filter"
                value={status}
                options={generateSelectOptions(generateStatuses(), 'url', 'name')}
                onChange={handleUpdateStatus}
            />
        </div>
       );
};

const mapStateToProps = (state) => ({
    statuses: flowStatusesSelector(state),
    projectUpdated: projectUpdatedSelector(state),
});

const mapDispatchToProps = { getFlowStatuses, updateProject, resetProjectState }

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectStatus);
