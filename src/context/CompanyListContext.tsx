import React, { createContext, useContext, useState, useEffect } from 'react';
import Company from '../models/Company';
import { fetchForUser } from '../services/dbService';
import { useAppStatus } from './AppStatusContext';

interface CompanyListContextType {
  companies: Company[];
}

const CompanyListContext = createContext<CompanyListContextType>({
  companies: [],
});

export const CompanyListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { setLoading } = useAppStatus();

  useEffect(() => {
    console.log('use effect: fetchCompanies');
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const fetchedCompanies = await fetchForUser(
          'users',
          'userType',
          'Company',
          Company.fromJson
        );
        setCompanies(fetchedCompanies);
      } catch (error) {
        console.error('Error fetching companies:', error);
        // You might want to set an error state here and display it to the user
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [setLoading]);

  useEffect(() => {
    console.log('companies', companies);
  }, [companies]);

  return (
    <CompanyListContext.Provider value={{ companies }}>
      {children}
    </CompanyListContext.Provider>
  );
};

export const useCompanyList = () => useContext(CompanyListContext);
