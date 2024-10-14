// src/components/investment-list/InvestmentList.tsx
import React from 'react';
import InvestmentCard from '../invest-card/InvestmentCard';
import Company from '../../../models/Company';
import { useUserPurchedContext } from '../../../context/PurchedContext';

interface InvestmentListProps {
  companies: Company[];
  showUserInvestments?: boolean;
}

const InvestmentList: React.FC<InvestmentListProps> = ({
  companies,
  showUserInvestments,
}) => {
  const { userInvestments } = useUserPurchedContext();
  return (
    <div className="all-investments__list">
      {companies.map((company) => {
        const userInvestment = showUserInvestments
          ? userInvestments.find((inv) => inv.companyUid === company.uid)
          : undefined;

        return (
          <InvestmentCard
            key={company.uid}
            company={company}
            userInvestment={userInvestment}
          />
        );
      })}
    </div>
  );
};

export default InvestmentList;
