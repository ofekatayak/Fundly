import React from 'react';
import Company from '../../../../../models/Company';
import { formatTargetAmount } from '../../../../../utils/functions';
import InvestmentProgress from '../../../../cummon/invest-card/InvestProgress';
import './CompanyTopSection.css';

interface BuyInvestProps {
  company: Company;
}

export const CompanyTopSection: React.FC<BuyInvestProps> = ({ company }) => {
  if (!company) {
    return <div>No company data available</div>;
  }

  const { companyDetails, raiseDetails } = company;

  // Calculate progress or use a default value
  const calculateProgress = () => {
    if (typeof company.calculateProgress === 'function') {
      return company.calculateProgress();
    }
    // Fallback calculation if the method doesn't exist
    if (raiseDetails?.targetAmount && raiseDetails?.currentInvestmentsAmount) {
      return (
        (raiseDetails.currentInvestmentsAmount / raiseDetails.targetAmount) *
        100
      );
    }
    return 0; // Default to 0 if we can't calculate
  };

  return (
    <div className="company-top-section1">
      <div className="investment-card1">
        <div className="left-side">
          <div className="investment-card__image1">
            <img
              src={companyDetails?.image ?? 'placeholder-image-url'}
              alt={`${company.name || 'Company'} Project`}
            />
          </div>
          <div className="investment-card__progress-content1">
            <div className="investment-card__progress-bar1">
              <InvestmentProgress progress={calculateProgress()} />
            </div>
            <p className="investment-card__investment1">
              <span className="investment-amount">
                {formatTargetAmount(
                  raiseDetails?.currentInvestmentsAmount ?? 0
                )}
                $
              </span>
              <span className="already-invested-text">already invested!</span>
            </p>
          </div>
        </div>
        <div className="investment-card__content1">
          <div className="investment-card__header1">
            <img
              src={companyDetails?.logo ?? 'placeholder-logo-url'}
              alt={`${company.name || 'Company'} Logo`}
              className="investment-card__logo1"
            />
            <h2 className="investment-card__title1">{company.name}</h2>
            <span className="investment-card__badge1">
              {companyDetails?.category ?? ''}
            </span>
          </div>
          <p className="investment-card__description1">
            {companyDetails?.about ?? ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyTopSection;
