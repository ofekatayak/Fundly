import React from 'react';
import { FaBell, FaSignOutAlt, FaChartLine, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/popupContext';
import Modal from '../popup/modal';
import Profile from '../../investor/profile/profile';
import { NotificationPanel } from '../notificationPanel/NotificationPanel';
import { useNotifications } from '../../../context/NotificationsContext';

const InvestorHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { modalType, setModalType } = useModal();
  const navigate = useNavigate();
  const { notifications } = useNotifications();

  const handleClick = () => {
    navigate('myInvestments');
  };

  return (
    <>
      <button
        className={'header__button header_button--fill'}
        onClick={() => handleClick()}
      >
        <span className="button-text">My Investments</span>
        <FaChartLine className="button-icon" />
      </button>
      <button
        className={'header__button header_button--border'}
        onClick={() => {
          setModalType('Profile');
        }}
      >
        <span className="button-text">My Profile</span>
        <FaUser className="button-icon" />
      </button>

      {modalType === 'Profile' && (
        <Modal>
          <Profile />
        </Modal>
      )}

      {notifications.length > 0 && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <FaBell
            size={25}
            color="#da678a"
            onClick={() => setModalType('Notifications')}
          />
          <span
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
            }}
          >
            {notifications.length}
          </span>
        </div>
      )}

      {modalType === 'Notifications' && (
        <Modal isDynamicSize={true}>
          <NotificationPanel />
        </Modal>
      )}

      <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
    </>
  );
};

export default InvestorHeader;
