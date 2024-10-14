import React, { useMemo, useState } from 'react';
import './ManagementInfo.css';
import Investor from '../../../../models/Investor';
import Company from '../../../../models/Company';
import { formatTargetAmount } from '../../../../utils/functions';

interface ManagementInfoProps {
  investors: Investor[];
  companies: Company[];
}

const ManagementInfo: React.FC<ManagementInfoProps> = ({
  investors,
  companies,
}) => {
  const info = useMemo(() => {
    // Calculate the total investment amount
    const totalInvestment = companies.reduce((sum, company) => {
      const amount =
        typeof company.raiseDetails.currentInvestmentsAmount === 'number'
          ? company.raiseDetails.currentInvestmentsAmount
          : parseFloat(company.raiseDetails.currentInvestmentsAmount) || 0;
      return sum + amount;
    }, 0);

    return [
      { value: `${formatTargetAmount(totalInvestment)}$`, label: 'Invested' },
      { value: companies.length.toString(), label: 'Companies' },
      { value: investors.length.toString(), label: 'Investors' },
    ];
  }, [investors, companies]);

  return (
    <div className="stats-container">
      {info.map((infoItem, index) => (
        <InfoCard key={index} value={infoItem.value} label={infoItem.label} />
      ))}
    </div>
  );
};

interface InfoCardProps {
  value: string | number;
  label: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ value, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`stat-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-background"></div>
    </div>
  );
};
export default ManagementInfo;
