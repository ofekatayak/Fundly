import Company from '../../../../../models/Company';
import './CompanyBasicInfo.css';
interface props {
  company: Company;
}
export const CompanyBasicInfo: React.FC<props> = ({ company }) => {
  return (
    <div className="info-section">
      <h2>Info</h2>
      <div className="info-content">
        <p>
          <strong>Country:</strong>
          <span>{company.companyDetails.country}</span>
        </p>
        <p>
          <strong>Web:</strong>
          <span>
            <a href={company.companyDetails.website} target="_blank">
              {company.companyDetails.website}
            </a>
          </span>
        </p>
        <p>
          <strong>Registered As company:</strong>
          <span>
            {company.companyDetails.registrarOfCompanies ? 'Yes' : 'No'}
          </span>
        </p>
        <p>
          <strong>Minimum Investment:</strong>
          <span>{company.raiseDetails.minInvestment}</span>
        </p>
      </div>
    </div>
  );
};
