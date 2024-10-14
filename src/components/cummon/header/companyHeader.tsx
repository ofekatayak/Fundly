// CompanyHeader.tsx
import React from 'react';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useModal } from '../../../context/popupContext';
import Modal from '../popup/modal';
import StepperForm from '../../auth/CompanySignUpForm/StepperForm';
import NotificationPanel from '../notificationPanel/NotificationPanel';
import { useNotifications } from '../../../context/NotificationsContext';

const CompanyHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { setModalType, modalType } = useModal();
  const { notifications } = useNotifications();

  return (
    <>
      <button
        className="header__button header_button--border"
        onClick={() => {
          setModalType('Profile');
        }}
      >
        Profile
      </button>

      {modalType === 'Profile' && (
        <Modal>
          <StepperForm />
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

export default CompanyHeader;
