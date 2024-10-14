import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchForUser } from '../services/dbService';
import MyNotification from '../models/Notification';
import { useUser } from './UserContext';
import { Timestamp } from 'firebase/firestore'; // Make sure to import Timestamp

interface NotificationContextType {
  notifications: MyNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<MyNotification[]>>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<MyNotification[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?.uid) {
        try {
          const result = await fetchForUser(
            'notifications',
            'reciverId',
            user.uid,
            MyNotification.fromJson
          );
          // Sort notifications by createdAt in descending order
          const sortedNotifications = result.sort((a, b) => {
            // Assuming createdAt is a Firestore Timestamp
            return b.createdAt.toMillis() - a.createdAt.toMillis();
          });
          setNotifications(sortedNotifications);
        } catch (error) {
          console.log('error fetching notifications', error);
        }
      }
    };
    fetchNotifications();
  }, [user?.uid]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
};
