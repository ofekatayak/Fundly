import React, { createContext, useContext, useState, useEffect } from 'react';

import Like from '../models/Like';
import { useUser } from './UserContext';
import { deleteDocument, fetchForUser, saveToDb } from '../services/dbService';

interface LikesContextType {
  likes: Like[];
  toggleLike: (companyId: string, userId: string) => void;
}

const LikesContext = createContext<LikesContextType>({
  likes: [],
  toggleLike: () => {},
});

export const LikesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    if (user && user.userType === 'Investor') {
      console.log('use effect : fetchLikes');
      fetchForUser('likes', 'userId', user.uid, Like.fromJson).then(setLikes);
    } else {
      console.log('use effect : set to Empty likes');
      setLikes([]);
    }
  }, []);

  useEffect(() => {
    console.log('likes:',likes);
  }, [likes]);

  const toggleLike = async (companyId: string, userId: string) => {
    console.log('toggle like');
    const newLikes = [...likes];
    //check if its like or unlike
    const likeIndex = newLikes.findIndex(
      (like) => like.companyId === companyId
    );

    if (likeIndex !== -1) {
      // Unlike
      console.log('delete like');
      newLikes.splice(likeIndex, 1);
      setLikes(newLikes);
      await deleteDocument('likes', `${userId}${companyId}`);
    } else {
      // Like
      console.log('new like');
      const newLike = new Like(userId + companyId, userId, companyId);
      newLikes.push(newLike);
      setLikes(newLikes);

      await saveToDb('likes', newLike.likeId, newLike);
    }
  };

  return (
    <LikesContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => useContext(LikesContext);
