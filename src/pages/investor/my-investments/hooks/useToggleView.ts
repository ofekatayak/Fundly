import { useState } from 'react';

export const useToggleView = () => {
  const [isLikesView, setIsLikesView] = useState<boolean>(false);

  const toggleView = () => {
    setIsLikesView(!isLikesView);
  };

  return { isLikesView, toggleView };
};
