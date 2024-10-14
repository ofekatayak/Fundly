import React, { useState } from 'react';
import './Modal.css';
import { getTitle, renderForm, renderSignUpAsButtons } from './modalHelper';
import { useModal } from '../../../context/popupContext';

interface ModalProps {
  isDynamicSize?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isDynamicSize = false, children }) => {
  const [step, setStep] = useState(1);
  const { closeModal, modalType, userType, setUserType } = useModal();

  return (
    <div className="modalBackground">
      <h1 className="modalTitle">{getTitle(modalType, userType, step)}</h1>

      <div className={`modal ${isDynamicSize ? 'dynamic-size' : 'fixed-size'}`}>
        <div className="titleCloseBtn">
          <button onClick={closeModal}>X</button>
        </div>

        {step === 1 &&
          modalType === 'Sign Up As' &&
          renderSignUpAsButtons(userType, setUserType)}

        <div className="body">
          {renderForm({ modalType, userType, step, setStep })}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
