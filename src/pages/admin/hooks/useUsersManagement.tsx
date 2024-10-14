import { useState, useEffect, useMemo, useCallback } from 'react';
import Company from '../../../models/Company';
import Investor from '../../../models/Investor';
import { fetchForUser, saveToDb } from '../../../services/dbService';
import { useModal } from '../../../context/popupContext';
import { toast } from 'react-toastify';
import { useUser } from '../../../context/UserContext';
import MyNotification from '../../../models/Notification';

type TableUser = Investor | Company;
type UserType = 'All' | 'Admin' | 'Company' | 'Investor';

export const useUsersManagement = (limitedRowsCount: number) => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<TableUser[]>([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<UserType>('All');
  const { setModalType, modalType, openModal } = useModal();
  const { user } = useUser();

  const loadUsers = useCallback(async () => {
    try {
      const fetchedInvestors = await fetchForUser(
        'users',
        'userType',
        'Investor',
        Investor.fromJson
      );
      const fetchedCompanies = await fetchForUser(
        'users',
        'userType',
        'Company',
        Company.fromJson
      );
      setInvestors(fetchedInvestors);
      setCompanies(fetchedCompanies);
      updateDisplayedUsers(fetchedInvestors, fetchedCompanies);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const updateDisplayedUsers = useCallback(
    (currentInvestors: Investor[], currentCompanies: Company[]) => {
      const allUsers = [...currentInvestors, ...currentCompanies];
      setDisplayedUsers(
        showAllUsers ? allUsers : allUsers.slice(0, limitedRowsCount)
      );
    },
    [showAllUsers, limitedRowsCount]
  );

  useEffect(() => {
    updateDisplayedUsers(investors, companies);
  }, [investors, companies, updateDisplayedUsers]);

  const deleteUser = useCallback((userId: string) => {
    setInvestors((prev) => prev.filter((inv) => inv.uid !== userId));
    setCompanies((prev) => prev.filter((comp) => comp.uid !== userId));
  }, []);

  const handleNotificationClick = useCallback(
    (userId: string) => {
      setSelectedUserId(userId);
      setModalType('Notifications');
    },
    [setModalType]
  );

  const handleSendNotification = useCallback(
    async (receiverId: string, subject: string, description: string) => {
      if (!user) {
        toast.warning('Please log in for contact with the company!');
        openModal('Login');
        return;
      }

      try {
        const notification = new MyNotification(
          user.uid,
          receiverId,
          subject,
          description
        );
        await saveToDb('notifications', null, notification);
        alert('Notification sent successfully!');
        setModalType('');
      } catch (error) {
        console.error('Error sending notification:', error);
        alert('Error sending notification. Please try again.');
      }
    },
    [user, setModalType]
  );

  const filteredUsers = useMemo(() => {
    const allUsers = [...investors, ...companies];
    return allUsers.filter(
      (user) =>
        (selectedUserType === 'All' || user.userType === selectedUserType) &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [companies, investors, searchTerm, selectedUserType]);

  useEffect(() => {
    const usersToDisplay = showAllUsers
      ? filteredUsers
      : filteredUsers.slice(0, limitedRowsCount);
    setDisplayedUsers(usersToDisplay);
  }, [filteredUsers, showAllUsers, limitedRowsCount]);

  const handleUserTypeChange = useCallback((userType: UserType) => {
    setSelectedUserType(userType);
  }, []);

  const toggleUsersDisplay = useCallback(() => {
    setShowAllUsers((prev) => !prev);
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Username',
        render: (user: TableUser) => user.name,
      },
      {
        header: 'Type',
        render: (user: TableUser) => user.userType,
      },
      {
        header: 'Email',
        render: (user: TableUser) => user.email,
      },
      {
        header: 'Additional Details',
        render: (user: TableUser) => {
          if (user instanceof Company) {
            return `${user.companyDetails.category}, ${user.raiseDetails.currentInvestmentsAmount}₪ invested`;
          } else if (user instanceof Investor) {
            return user.preferences.categories.join(', ');
          }
          return '';
        },
      },
    ],
    []
  );

  return {
    investors,
    companies,
    displayedUsers,
    showAllUsers,
    toggleUsersDisplay,
    deleteUser,
    columns,
    reloadUsers: loadUsers,
    handleNotificationClick,
    handleSendNotification,
    selectedUserId,
    modalType,
    searchTerm,
    setSearchTerm,
    selectedUserType,
    handleUserTypeChange,
  };
};
