// Header.tsx
import React from 'react';
import './Header.css';
import InvestorHeader from './investorHeader';
import AdminHeader from './adminHeader';
import CompanyHeader from './companyHeader';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useUser } from '../../../context/UserContext';
import { useModal } from '../../../context/popupContext';
import { logoutUser } from '../../../services/authService';
import { RoutePath } from '../../../utils/enums';
import Modal from '../popup/modal';

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useUser();
  const { isModalOpen, openModal } = useModal(); // control on pop up
  const nagivate = useNavigate();

  const handleLogout = async () => {
    const isConfirmed = window.confirm('Are you sure to logout ??');
    if (isConfirmed) {
      try {
        await logoutUser();
        setUser(null);
        nagivate(RoutePath.Home); // Navigate to home page
      } catch (error) {
        console.error('Error signing out: ', error);
        // Optionally, show an error message to the user
        alert('Error for logout');
      }
    }
  };
  // check if user is sign in and show spetsific header for aim
  const renderHeaderButtons = () => {
    if (!user) {
      return (
        <>
          <button
            className="header__button header_button--border"
            onClick={() => openModal('Login')}
          >
            Login
          </button>
        </>
      );
    }

    // when user logged in
    switch (user.userType) {
      case 'Investor':
        return <InvestorHeader handleLogout={handleLogout} />;
      case 'Company':
        return <CompanyHeader handleLogout={handleLogout} />;
      case 'Admin':
        return <AdminHeader handleLogout={handleLogout} />;
      default:
        return (
          <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
        );
    }
  };

  // the header will show the spetsific header
  return (
    <>
      <header className="header">
        <div className="header__logo" onClick={() => nagivate(RoutePath.Home)}>
          <h3
            onClick={() => nagivate(RoutePath.Home)}
            style={{ color: '#7fcbc4', cursor: 'pointer' }}
          >
            Foundly
          </h3>
        </div>
        <div className="header__buttons">{renderHeaderButtons()}</div>
        {isModalOpen && <Modal children={undefined} />}
      </header>
      {children}
    </>
  );
};

export default Header;
