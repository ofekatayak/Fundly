import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLikes } from '../../../context/LikesContext';
import { useUser } from '../../../context/UserContext';
import './LikeButton.css';
import { useModal } from '../../../context/popupContext';

interface LikeButtonProps {
  companyId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ companyId }) => {
  const { user } = useUser();
  const { likes, toggleLike } = useLikes();
  const [isAnimating, setIsAnimating] = useState(false);
  const { openModal } = useModal();
  const liked = likes.some((like) => like.companyId === companyId);

  const handleLikeClick = () => {
    if (!user) {
      toast.warning('Please log in to save investments!');
      openModal('Login');
      return;
    }
    if (user.userType !== 'Investor') {
      toast.warning('Permission denied!');
      return;
    }

    setIsAnimating(true);
    toggleLike(companyId, user.uid);

    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <button
      className={`like-button-container ${liked ? 'liked' : ''} ${
        isAnimating ? 'animate' : ''
      }`}
      onClick={handleLikeClick}
    >
      <div className="like-button-background">
        {liked ? (
          <FaHeart className="filled-heart" />
        ) : (
          <FaRegHeart className="empty-heart" />
        )}
      </div>
      <div className="heart-burst">
        {[...Array(6)].map((_, index) => (
          <div key={index} className={`heart-particle particle-${index}`} />
        ))}
      </div>
    </button>
  );
};

export default LikeButton;
