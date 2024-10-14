// InvestmentProgress.tsx
import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

interface InvestmentProgressProps {
  progress: number;
}

const InvestmentProgress: React.FC<InvestmentProgressProps> = ({ progress }) => (
  <div className="investment-card__progress">
    <ProgressBar
      completed={progress}
      maxCompleted={100}
      bgColor="#39958c"
      labelColor="white"
      baseBgColor="#d0ebea"
    />
  </div>
);

export default InvestmentProgress;