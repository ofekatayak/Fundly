import { useState, useEffect } from 'react';
import Company from '../../../../models/Company';
import { useCompanyList } from '../../../../context/CompanyListContext';
import { useUserPurchedContext } from '../../../../context/PurchedContext';

export const usePurchasedCompanies = () => {
  const [purchasedCompanies, setPurchasedCompanies] = useState<Company[]>([]);
  const { userInvestments } = useUserPurchedContext();
  const { companies } = useCompanyList();

  useEffect(() => {
    const purchasedCompanyIds = new Set(
      userInvestments.map((purchase) => purchase.companyUid)
    );
    const filteredCompanies = companies.filter((company) =>
      purchasedCompanyIds.has(company.uid)
    );
    setPurchasedCompanies(filteredCompanies);
  }, [userInvestments, companies]);

  return purchasedCompanies;
};
