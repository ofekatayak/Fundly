import { useState, useEffect } from 'react';
import { useCompanyList } from '../../../../context/CompanyListContext';
import { useLikes } from '../../../../context/LikesContext';
import Company from '../../../../models/Company';

export const useLikedCompanies = () => {
  const [likedCompanies, setLikedCompanies] = useState<Company[]>([]);
  const { likes } = useLikes();
  const { companies } = useCompanyList();

  useEffect(() => {
    const likedCompanyIds = new Set(likes.map((like) => like.companyId));
    const filteredCompanies = companies.filter((company) =>
      likedCompanyIds.has(company.uid)
    );
    setLikedCompanies(filteredCompanies);
  }, [likes, companies]);

  return likedCompanies;
};
