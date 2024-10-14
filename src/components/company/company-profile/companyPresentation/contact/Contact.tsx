import { useEffect, useState } from 'react';
import { useUsersManagement } from '../../../../../pages/admin/hooks/useUsersManagement';
import './Contact.css';
import User from '../../../../../models/User';

interface props {
  receiver: User;
  isReply?: boolean;
}

export const Contact: React.FC<props> = ({ isReply, receiver }) => {
  const [subject, setsubject] = useState('');
  const [description, setDescription] = useState('');
  const { handleSendNotification } = useUsersManagement(0);
  const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('check5   ');
    handleSendNotification(receiver.uid, subject, description);
    setDescription('');
    setsubject('');
  };
  return (
    <>
      <div className="contact-section">
        {!isReply && <h2 style={{ color: '#7fcbc4' }}>Contact</h2>}
        <form className="contact-form">
          <div className="form-group">
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              placeholder="Subject"
              required
              onChange={(e) => setsubject(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={description}
              rows={4}
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="submit-button"
              onClick={(e) => handleSend(e)}
            >
              {!isReply ? 'Send' : 'Reply'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
