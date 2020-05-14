import React, {useEffect, useState} from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { Bell } from 'react-feather';
import { connect } from 'react-redux';
import { getNotifications, patchNotification } from '../common/commonActions';
import {
    notificationsSelector,
    notificationUpdatedSelector
} from '../common/commonReducer';
import { push } from 'connected-react-router';


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
        getNotifications();
        setInterval(() => setTimeout(getNotifications()), 30000);
    }, [ getNotifications ]);

    useEffect(() => {
        if (updated) {
            push(clickedNotification.url_mapping[0].url);
            getNotifications();
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
        setClickedNotification(notification);
        setTimeout(() => setShowDropdownItems(false));
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
        const message = notification.message.replace(re, '');

        return (
            <React.Fragment key={notification.id}>
                <Dropdown.Item
                    onClick={() => handleNotificationClick(notification)}
                    className={!notification.is_read ? 'unread notification-item' : 'notification-item'}
                    as="div">
                    <span className="small font-weight-bold">
                        {notification.subject}
                    </span><br/>
                    <span>{message}</span><br/>
                    <span className="small btn-link text-decoration-none">click notification to see {notification.url_mapping[0].key}</span>
                </Dropdown.Item>
                <Dropdown.Divider/>
            </React.Fragment>
        );
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
                            className="text-center"
                        >
                            <a href="">Show all</a>
                        </Dropdown.Item>
                    ) : null }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};


const mapStateToProps = (state) => ({
    notifications: notificationsSelector(state),
    updated: notificationUpdatedSelector(state),
});


const mapDispatchToProps = {
    getNotifications,
    patchNotification,
    push,
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
