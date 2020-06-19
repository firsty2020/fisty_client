import React, {useEffect, useState} from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { Bell } from 'react-feather';
import { connect } from 'react-redux';
import { getNotifications, patchNotification } from '../common/commonActions';
import { notificationsState,
    notificationUpdatedSelector
} from '../common/commonReducer';
import { push } from 'connected-react-router';
import { generateUId } from '../../helpers/utils';


const uid = generateUId();


const Notifications = ({
                           notifications,
                           updated,
                           getNotifications,
                           patchNotification,
                           push,
                       }) => {

    const [ showDropdownItems, setShowDropdownItems ] = useState(false);
    const [ clickedNotification, setClickedNotification ] = useState(null);

    useEffect(() => {
        getNotifications(null, uid);
        setInterval(() => setTimeout(getNotifications(null, uid)), 30000);
    }, [ getNotifications ]);

    useEffect(() => {
        if (updated) {
            if (clickedNotification) {
                push(clickedNotification.url_mapping[0].url);
            }
            getNotifications(null, uid);
        }
    }, [ updated, getNotifications ]);

    if (!notifications) {
        return null;
    }

    const onToggle = (isOpen, event, metadata) => {
        if (metadata.source === 'select') {
            setShowDropdownItems(true);
        } else {
            setShowDropdownItems(isOpen);
        }
    };

    const handleNotificationClick = (notification) => {
        setTimeout(() => setShowDropdownItems(false));
        setClickedNotification(notification);
        if (!notification.is_read) {
            patchNotification(notification.id, { is_read: true });
        } else {
            push(notification.url_mapping[0].url);
        }
    };

    const generateNotification = (notification, index) => {
        const limitTo = 4;

        if (index > limitTo) {
            return null;
        }
        const re = /\{([^}]+)\}/;
        const message = notification.message.replace(re, notification.url_mapping[0].key);

        return (
            <React.Fragment key={notification.id}>
                <Dropdown.Item
                    onClick={() => handleNotificationClick(notification)}
                    className={!notification.is_read ? 'unread notification-item' : 'notification-item'}
                    as="div">
                    <span className="small font-weight-bold blue">
                        {notification.subject}
                    </span><br/>
                    <span>{message}</span><br/>
                </Dropdown.Item>
                <Dropdown.Divider/>
            </React.Fragment>
        );
    };

    const handleShowAllClick = () => {
        setTimeout(() => setShowDropdownItems(false));
        push('/recruiter/notifications');
    };

    return (
        <div>
            {notifications.unread_count ? (
                <Badge
                    pill
                    variant="danger"
                    className="counter"
                >{notifications.unread_count}</Badge>
            ) : null}
            <Dropdown
                show={showDropdownItems}
                className="notification"
                onToggle={(isOpen, event, metadata) => onToggle(isOpen, event, metadata)}
            >
                <Dropdown.Toggle
                    as="div"
                    id="dropdown-basic" >
                    <Bell/>
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-0">
                    {(notifications.results || []).map((notification, index) => generateNotification(notification, index))}
                    {notifications && notifications.count > 3 ? (
                        <Dropdown.Item
                            as="div"
                            href="#/action-3"
                            className="text-center rm-active-bg"
                            onClick={handleShowAllClick}
                        >
                            <span className="link">Show All</span>
                        </Dropdown.Item>
                    ) : null }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};


const mapStateToProps = (state) => {
    const notificationsSelector = notificationsState(uid);

    return {
        notifications: notificationsSelector(state),
        updated: notificationUpdatedSelector(state),
    }
};


const mapDispatchToProps = {
    getNotifications,
    patchNotification,
    push,
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
