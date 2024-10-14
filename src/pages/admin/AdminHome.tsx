import React from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAll from '../../components/cummon/open-all/OpenAll';
import ManagmentInfo from '../../components/admin/home/managment-info/ManagmentInfo';
import { useUsersManagement } from './hooks/useUsersManagement';
import { useLastInvestments } from './hooks/useLastInvestments';
import GenericUsersTable from '../../components/cummon/users-table/GenericTable';
import LastInvestmentsChart from '../../components/admin/home/LastInvestmentChart';
import { deleteDocument } from '../../services/dbService';
import Company from '../../models/Company';
import { RoutePath } from '../../utils/enums';
import Modal from '../../components/cummon/popup/modal';
import SearchBar from '../../components/cummon/search/SearchBar';
import AdminNotification from '../../components/admin/home/notifications/Notifications';

const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  const limitedRowsCount = 4;
  const {
    investors,
    companies,
    displayedUsers,
    showAllUsers,
    toggleUsersDisplay,
    deleteUser,
    columns: userColumns,
    reloadUsers,
    handleNotificationClick,
    handleSendNotification,
    selectedUserId,
    modalType,
    searchTerm,
    setSearchTerm,
    selectedUserType,
    handleUserTypeChange,
  } = useUsersManagement(limitedRowsCount);

  const {
    displayedInvestments,
    showAllInvestments,
    toggleInvestmentsDisplay,
    columns: investmentColumns,
  } = useLastInvestments(limitedRowsCount);

  const totalUsers = investors.length + companies.length;
  const totalInvestments = displayedInvestments.length;

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteDocument('users', userId);
        deleteUser(userId);
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again.');
        reloadUsers();
      }
    }
  };

  const handleUserRowClick = (user: any) => {
    if (user instanceof Company) {
      navigate(`${RoutePath.CompanyProfile}/${user.uid}`);
    }
  };

  const styles = {
    header: {
      textAlign: 'center' as const,
      color: '#728f9e',
      fontSize: '2.5rem',
      marginBottom: '30px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px 0',
      padding: '20px',
      backgroundColor: '#fdffff',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    searchBar: {
      width: '100%',
      maxWidth: '500px',
      marginRight: '15px',
    },
    dropdown: {
      padding: '10px 15px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1px solid #39958c',
      backgroundColor: 'white',
      color: '#39958c',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#39958c',
        color: 'white',
      },
    },
    tableContainer: {
      margin: '20px 0',
      padding: '20px',
      backgroundColor: '#fdffff',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          minHeight: '100vh',
        }}
      >
        <h1 style={styles.header}>Management Panel</h1>
        <ManagmentInfo investors={investors} companies={companies} />
        <div style={styles.searchContainer}>
          <div style={styles.searchBar}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <select
            value={selectedUserType}
            onChange={(e) =>
              handleUserTypeChange(
                e.target.value as 'All' | 'Admin' | 'Company' | 'Investor'
              )
            }
            style={styles.dropdown}
          >
            <option value="All">All Users</option>
            <option value="Admin">Admins</option>
            <option value="Company">Companies</option>
            <option value="Investor">Investors</option>
          </select>
        </div>
        <div style={styles.tableContainer}>
          <OpenAll
            title={'Users'}
            onClick={toggleUsersDisplay}
            buttonText={
              showAllUsers || displayedUsers.length <= limitedRowsCount
                ? 'Less'
                : 'All'
            }
          />
          <GenericUsersTable
            isUserTable={true}
            isAdmin={true}
            data={displayedUsers}
            columns={userColumns}
            onDelete={handleDeleteUser}
            onRowClick={handleUserRowClick}
            onNotificationClick={handleNotificationClick}
          />
        </div>

        <OpenAll
          title={'Last Investments'}
          onClick={toggleInvestmentsDisplay}
          buttonText={
            showAllInvestments || totalInvestments <= limitedRowsCount
              ? 'All'
              : 'Less'
          }
        />
        <div style={styles.tableContainer}>
          <GenericUsersTable
            data={displayedInvestments}
            columns={investmentColumns}
          />
        </div>
        <OpenAll title={'Chart'} onClick={() => {}} buttonText={''} />
        <LastInvestmentsChart investments={displayedInvestments} />

        {modalType === 'Notifications' && selectedUserId && (
          <Modal>
            <AdminNotification
              receiverId={selectedUserId}
              onSendNotification={handleSendNotification}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
export default AdminHome;
