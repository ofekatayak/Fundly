import React from 'react';
import './investmentsSection.css';
import { useNavigate } from 'react-router-dom';

import InvestmentList from '../../../cummon/invest-card/InvestList';
import { useCompanyList } from '../../../../context/CompanyListContext';
import { useAppStatus } from '../../../../context/AppStatusContext';
import { ClipLoader } from 'react-spinners';

const InvestmentsSection: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useAppStatus();
  const { companies } = useCompanyList();

  const handleAllClick = () => {
    navigate('allInvestments');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#39958c" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <section className="investments-section">
      <div className="investments-section__header">
        <button
          className="investments-section__button"
          onClick={handleAllClick}
        >
          All
        </button>
        <h4 className="investments-section__title">Suggested Investments</h4>
      </div>
      <div className="investments-section__list">
        <InvestmentList companies={companies.slice(0, 3)} />
      </div>
    </section>
  );
};

export default InvestmentsSection;
