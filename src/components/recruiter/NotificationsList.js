import React, {useEffect, useState} from 'react';
import {
    isLoadingSelector, notificationsState,
    notificationUpdatedSelector
} from '../common/commonReducer';
import { getNotifications, patchNotification } from '../common/commonActions';
import { push } from "connected-react-router";
import { connect } from 'react-redux';
import { Container, ListGroup } from 'react-bootstrap';
import Pagination from '../Pagination';
import { generateUId } from '../../helpers/utils';
import { EmptyListPlaceholder } from '../ui';


const uid = generateUId();



const NotificationsList = ({ notifications, updated, getNotifications, patchNotification, push }) => {

    const [ redirectLink, setRedirectLink ] = useState('');

    useEffect(() => {
        getNotifications(null, uid);
    }, [ getNotifications ]);

    useEffect(() => {
        if (updated) {
            if (redirectLink) {
                push(redirectLink);
            }
            getNotifications(null, uid);
        }
    }, [ updated, getNotifications ]);


    if (notifications && notifications.results && !notifications.results.length) {
        return <EmptyListPlaceholder/>
    }

    const handleNotificationClick = (e, { id, is_read }) => {
        e.persist();
        const link = e.target.getAttribute('data-href');
        if (link) {
            if (!is_read) {
                setRedirectLink(link);
                return patchNotification(id, { is_read: true });
            } else {
                return push(link);
            }
        }
        if (!is_read) {
            return patchNotification(id, {is_read: true});
        }
    };
    
    const generateNotification = ({ id, is_read, message, subject, url_mapping }) => {
        const re = /\{([^}]+)\}/;
        const messageString = message.replace(
            re,
            `<span data-href="${url_mapping[0].url}" class="link">${url_mapping[0].key}</span>`);
        return (
            <ListGroup.Item
                onClick={(e) => handleNotificationClick(e, { id, is_read })}
                className={!is_read ? 'unread notification-item' : 'notification-item'}
                action
                as="div"
                key={id}
            >
                <span className="small font-weight-bold">{subject}</span>
                <br/>
                <span dangerouslySetInnerHTML={{ __html: messageString }}/>
                <br/>
            </ListGroup.Item>
        );
    };

    return (
        <Container>
            <div>
                <ListGroup>
                    {(notifications && notifications.results ? notifications.results : []).map((notification) => generateNotification(notification))}
                </ListGroup>
            </div>
            <div className="mt-2">
                <Pagination
                    action={getNotifications}
                    data={notifications}
                    uid={uid}
                />
            </div>
        </Container>
    );
};


const mapStateToProps = (state) => {
    const notificationsSelector = notificationsState(uid);

    return {
        notifications: notificationsSelector(state),
        updated: notificationUpdatedSelector(state),
        loading: isLoadingSelector(state),
    }
};

const mapDispatchToProps = {
    getNotifications,
    patchNotification,
    push,
};


export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
