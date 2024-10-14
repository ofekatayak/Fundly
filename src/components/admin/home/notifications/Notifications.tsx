import React, { useState } from 'react';
import styles from './Notifications.module.css';

interface AdminNotificationProps {
  receiverId: string;
  onSendNotification: (
    receiverId: string,
    subject: string,
    description: string
  ) => void;
}

const AdminNotification: React.FC<AdminNotificationProps> = ({
  receiverId,
  onSendNotification,
}) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendNotification(receiverId, subject, description);
    setSubject('');
    setDescription('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Send Notification</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className={styles.textarea}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default AdminNotification;