import { useState, useEffect } from 'react';
import User from '../../../../models/User';
import { fetchUserFromDb } from '../../../../services/dbService';

export const useUserDetails = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await fetchUserFromDb(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading };
};
