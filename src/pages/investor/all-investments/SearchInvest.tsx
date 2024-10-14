// src/pages/SearchInvestments.tsx
import React, { useState } from 'react';
//import { companies } from '../../../utils/constant';
import { LikesProvider } from '../../../context/LikesContext';

import './SearchInvestment.css'; // Add this line
import SearchBar from '../../../components/cummon/search/SearchBar';
import InvestmentList from '../../../components/cummon/invest-card/InvestList';
import FilterButton from '../../../components/cummon/filter/FilterButton';
import { useCompanyList } from '../../../context/CompanyListContext';

const SearchInvestments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { companies } = useCompanyList();

  const filteredCompanies = companies
    .filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((company) =>
      selectedFilters.length === 0
        ? true
        : selectedFilters.includes(company.companyDetails.category)
    );

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  return (
    <LikesProvider>
      <div className="all-investments">
        <div className="all-investments__search-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterButton onFilterChange={handleFilterChange} />
        </div>
        <h4 style={{ textAlign: 'center' }} className="title">
          All investments
        </h4>
        <div className="all-investments__list">
          <InvestmentList companies={filteredCompanies} />
        </div>
      </div>
    </LikesProvider>
  );
};

export default SearchInvestments;
