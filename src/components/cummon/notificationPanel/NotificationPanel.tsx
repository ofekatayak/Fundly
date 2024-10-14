import { useAppStatus } from '../../../context/AppStatusContext';
import { ClipLoader } from 'react-spinners';
import React from 'react';
import { useNotifications } from '../../../context/NotificationsContext';
import { NotificationItem } from './NotificationItem';
import './NotificationPanel.css';

export const NotificationPanel: React.FC = () => {
  const { notifications } = useNotifications();
  const { loading } = useAppStatus();

  if (loading) {
    return <ClipLoader color="#46968c" loading={loading} size={50} />;
  }

  return (
    <div className="notification-panel">
      <h1 style={{ color: '#728f9e' }}>
        Notifications: {notifications.length}
      </h1>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};

export default NotificationPanel;
