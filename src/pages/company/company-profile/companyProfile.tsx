import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BuyInvest from '../../../components/company/company-profile/buy-invest/BuyInvest';
import { CompanyDetails } from '../../../components/company/company-profile/CompanyDetails';
import CompanyTopSection from '../../../components/company/company-profile/companyPresentation/companyTopSection/CompanyTopSection';
import { YoutubeVideoSection } from '../../../components/company/company-profile/youtubeVideoSection/YoutubeVideoSection';
import { useCompanyList } from '../../../context/CompanyListContext';
import { useModal } from '../../../context/popupContext';
import { useUser } from '../../../context/UserContext';
import Company from '../../../models/Company';
import Modal from '../../../components/cummon/popup/modal';
import { toast } from 'react-toastify';
import './CompanyProfile.css';
import Button from '../../../components/cummon/Button';

const CompanyProfile: React.FC = () => {
  const { setModalType, modalType, openModal } = useModal();
  const { user } = useUser();
  const { companyId } = useParams<{ companyId: string }>();
  const location = useLocation();
  const [company, setCompany] = useState<Company | null>(null);
  const { companies } = useCompanyList();

  useEffect(() => {
    const getCompany = () => {
      if (location.state?.company) {
        setCompany(Company.fromJson(location.state.company));
      } else if (companyId) {
        const foundCompany = companies.find((c) => c.uid === companyId);
        if (foundCompany) {
          setCompany(Company.fromJson(foundCompany));
        } else {
          console.error('Company not found');
        }
      }
    };

    getCompany();
  }, [companyId, location.state, companies]);

  if (!company) {
    return <div>Loading...</div>;
  }

  const handleBuy = () => {
    if (!user) {
      toast.warning('Pls login for buy investments!');
      openModal('Login');
      return;
    }
    console.log(company.uid);
    setModalType('Buy');
  };

  return (
    <>
      <CompanyTopSection company={company} />
      <YoutubeVideoSection
        youtubeVideoAddress={company.companyDetails.promoVideoLink}
      />
      <CompanyDetails company={company} />
      <div className="center-button-container">
        <Button
          label="I want to invest"
          onClick={() => handleBuy()}
          color="white"
          backgroundColor="#39958c"
          borderColor=""
          width="300px"
          height="60px"
          fontSize="20px"
        />
      </div>
      {modalType === 'Buy' && user?.uid && (
        <Modal>
          <BuyInvest
            investorUid={user.uid}
            companyUid={company.uid}
            minInvest={company.raiseDetails.minInvestment}
          />
        </Modal>
      )}
    </>
  );
};

export default CompanyProfile;
