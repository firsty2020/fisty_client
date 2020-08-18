import { DropDown } from '../../ui';
import {extractIdFromUrl, generateSelectOptions} from '../../../helpers/utils';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { resetProjectState, updateProject } from '../commonActions';
import { isLoadingSelector, projectUpdatedSelector } from '../commonReducer';
import api from '../../../axios';

const UpdateProjectStatus = ({
                                 project,
                                 updateProject,
                                 updated,
                                 projectUpdated,
                                 resetProjectState,
                                 pending,
                             }) => {

    const params = { flow: extractIdFromUrl(project.flow), show_all: true };

    const [ status, setStatus ] = useState(null);
    const [ updatedProjectId, setUpdatedProjectId ] = useState(null);
    const [ statuses, setStatuses ] = useState([]);
    const [ projectStatus, setProjectStatus ] = useState(null);

    useEffect(() => {
        if (!project) return ;
        const getStatuses = async () => {
            const {data} = await api.request({
                url: 'flow-status',
                method: 'GET',
                params
            });
            setStatuses(data.results);
        }
        getStatuses();

    }, [ ]);

    useEffect(() => {
        if (!statuses.length || status) return;
        const _projectStatus = statuses.find(({url}) => url === project.flow_status);
        _projectStatus.name = _projectStatus.main_status_details.name;
        setProjectStatus(_projectStatus);
        setStatus({value: _projectStatus.url, label: _projectStatus.name});
    });

    useEffect(() => {
        if (projectUpdated && project.id === updatedProjectId) {
            resetProjectState();
            const _projectStatus = statuses.find(({url}) => url === project.flow_status);
            _projectStatus.name = _projectStatus.main_status_details.name;
            setProjectStatus(_projectStatus);
            setUpdatedProjectId(null);
            updated();
        }
    }, [projectUpdated, updated, resetProjectState]);


    if (!statuses.length || !projectStatus || !project) return null;


    const generateStatuses = () => {
        return project.flow_status_details.available_statuses
            .reduce((acc, curr) => {
                const _status = statuses.find(({url}) => url === curr);
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
        setUpdatedProjectId(project.id)
        updateProject(project.id, {flow_status: e.value});
    }

    return (
        <div style={{width: '200px'}}
            onClick={(e) => e.stopPropagation()}>
            <DropDown
                isDisabled={pending && project.id === updatedProjectId}
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
    projectUpdated: projectUpdatedSelector(state),
    pending: isLoadingSelector(state),
});

const mapDispatchToProps = { updateProject, resetProjectState }

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectStatus);
