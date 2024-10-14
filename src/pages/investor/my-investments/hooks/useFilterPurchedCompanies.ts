import { useState, useEffect } from 'react';
import Company from '../../../../models/Company';
import { usePurchasedCompanies } from './usePurchedCompanies';

export const useFilteredPurchasedCompanies = (
  searchTerm: string,
  selectedFilters: string[]
) => {
  const purchasedCompanies = usePurchasedCompanies();
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const filtered = purchasedCompanies
      .filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((company) =>
        selectedFilters.length === 0
          ? true
          : selectedFilters.includes(company.companyDetails.category)
      );
    setFilteredCompanies(filtered);
  }, [purchasedCompanies, searchTerm, selectedFilters]);

  return filteredCompanies;
};
