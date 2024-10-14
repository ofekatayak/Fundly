// ReplyForm.tsx
import React from 'react';
import { Contact } from '../../company/company-profile/companyPresentation/contact/Contact';
import User from '../../../models/User';

interface ReplyFormProps {
  receiver: User;
  onClose: () => void;
}

export const ReplyForm: React.FC<ReplyFormProps> = ({ receiver, onClose }) => {
  return (
    <div className="reply-form">
      <h3>Reply to {receiver.name}</h3>
      <Contact receiver={receiver} isReply={true} />
      <button className="cancel-button" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};
