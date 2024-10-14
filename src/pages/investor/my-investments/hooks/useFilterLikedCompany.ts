import { useState, useEffect } from 'react';
import { useLikedCompanies } from './useLikesComapny';
import Company from '../../../../models/Company';

export const useFilteredLikedCompanies = (
  searchTerm: string,
  selectedFilters: string[]
) => {
  const likedCompanies = useLikedCompanies();
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const filtered = likedCompanies
      .filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((company) =>
        selectedFilters.length === 0
          ? true
          : selectedFilters.includes(company.companyDetails.category)
      );
    setFilteredCompanies(filtered);
  }, [likedCompanies, searchTerm, selectedFilters]);

  return filteredCompanies;
};
