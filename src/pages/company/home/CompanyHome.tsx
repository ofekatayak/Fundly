import React from 'react';
import MiddleSection from '../../../components/company/CompanyHome/MiddleSection/MiddleSection';
import RecentActivitySection from '../../../components/company/CompanyHome/RecentActivitySection/RecentActivitySection';
import CompanyTopSection from '../../../components/company/company-profile/companyPresentation/companyTopSection/CompanyTopSection';
import { useUser } from '../../../context/UserContext';
import Company from '../../../models/Company';
import './cssFile.css';
import { useModal } from '../../../context/popupContext';

const CompanyHome: React.FC = () => {
  const { user } = useUser();
  const { setModalType } = useModal();
  const company = user as Company;

  const hasDocuments =
    company.uploadedDocuments && company.uploadedDocuments.length > 0;

  const handkeClick = () => {
    setModalType('Profile');
  };

  return (
    <>
      {!hasDocuments && (
        <div onClick={handkeClick} className="warning">
          <p>Please upload the necessary documents to complete your profile.</p>
        </div>
      )}
      <CompanyTopSection company={company} />
      <MiddleSection />
      <RecentActivitySection />
    </>
  );
};

export default CompanyHome;
