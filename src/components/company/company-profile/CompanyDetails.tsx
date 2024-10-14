import Company from '../../../models/Company';
import { CompanyBasicInfo } from './companyPresentation/companyBasicInfo/CompanyBasicInfo';
import { Contact } from './companyPresentation/contact/Contact';
import { CompanyDocs } from './companyPresentation/companyDocs/CompanyDocs';
import './CompanyDetails.css';


interface props {
  company: Company;
}
export const CompanyDetails: React.FC<props> = ({ company }) => {
  return (
    <>
      <div className="details-container">
        <div className="docs-container company-section">
          <CompanyDocs company={company} />
        </div>
        <div className="separator"></div>
        <div className="info-container company-section">
          <CompanyBasicInfo company={company} />
        </div>
        <div className="separator"></div>
        <div className="contact-container company-section">
          <Contact receiver={company} />
        </div>
      </div>
    </>
  );
};
