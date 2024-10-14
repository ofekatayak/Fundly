// InvestmentInfoItem.tsx
import React from 'react';

interface InvestmentInfoItemProps {
  value: string | number;
  label: string;
}

const InvestmentInfoItem: React.FC<InvestmentInfoItemProps> = ({
  value,
  label,
}) => (
  <div className="investment-card__info-item">
    <span className="investment-card__info-value">{value}</span>
    <p className="investment-card__info-label">{label}</p>
  </div>
);

export default InvestmentInfoItem;
