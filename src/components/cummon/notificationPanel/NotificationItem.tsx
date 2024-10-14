import React, { useState } from 'react';
import MyNotification from '../../../models/Notification';
import { useUserDetails } from '../../../pages/investor/hooks/notifications/useUserDetailes';
import { formatTimestamp } from '../../../utils/functions';
import { ReplyForm } from './ReplayForm';
import './NotificationPanel.css';
import { UserType } from '../../../utils/enums';
import { ClipLoader } from 'react-spinners';

interface NotificationItemProps {
  notification: MyNotification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const [replying, setReplying] = useState(false);
  const { user: sender, loading } = useUserDetails(notification.senderId);

  if (loading || !sender) {
    return null;
  }


  const iAllowToReplay = sender.userType !== UserType.Admin;


  return (
    <div className="notification-item">
      <div className="notification-header">
        <span className="company-name">{sender.name}</span>
        <span className="notification-date">
          {formatTimestamp(notification.createdAt)}
        </span>
        {iAllowToReplay && ( // Only show the reply button if the sender is a Company | Investor
          <button
            className="button-notification"
            onClick={() => setReplying(true)}
          >
            Reply
          </button>
        )}
      </div>
      <div className="notification-body">
        <h3 className="notification-subject ">{notification.subject}</h3>
        <p className="notification-description">{notification.description}</p>
      </div>
      {replying && (
        <ReplyForm receiver={sender} onClose={() => setReplying(false)} />
      )}
    </div>
  );
};
