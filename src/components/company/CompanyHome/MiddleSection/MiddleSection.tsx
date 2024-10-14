import React, { useEffect, useState } from 'react';
import './MiddleSection.css';
import { useUser } from '../../../../context/UserContext';
import { fetchForUser } from '../../../../services/dbService';
import Company from '../../../../models/Company';
import Invest from '../../../../models/Invest';
import {
  calculateRemainingDays,
  formatRemainingTime,
  formatTargetAmount,
} from '../../../../utils/functions';

const MiddleSection = () => {
  const { user } = useUser();
  const [data, setData] = useState({
    target: 0,
    total: 0,
    investoramount: 0,
    daysToComplete: 0,
    remainingTimeValue: '',
    remainingTimeUnit: '',
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        try {
          const company = user as Company;
          const investoramount = await fetchForUser(
            'investments',
            'companyUid',
            company.uid,
            Invest.fromJson
          );
          const targetPrecent = company.calculateProgress();
          const totalRaised = company.raiseDetails.currentInvestmentsAmount;
          const daysComplete = calculateRemainingDays(
            company.raiseDetails.deadline
          );
          const { value: remainingTimeValue, unit: remainingTimeUnit } =
            formatRemainingTime(daysComplete);

          setData({
            target: targetPrecent,
            total: totalRaised,
            investoramount: investoramount.length,
            daysToComplete: daysComplete,
            remainingTimeValue,
            remainingTimeUnit,
          });

          // Trigger animation after data is loaded
          setIsVisible(true);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    getData();
  }, [user]);

  return (
    <div className={`middle-section ${isVisible ? 'visible' : ''}`}>
      <div className="content">
        <div className="information">
          <div className="info-item">
            <p className="target">
              <span className="value">{data.target}%</span>
              <span className="label">of target</span>
            </p>
          </div>
          <div className="info-item">
            <p className="total">
              <span className="value">{formatTargetAmount(data.total)}$</span>
              <span className="label">invested</span>
            </p>
          </div>
          <div className="info-item">
            <p className="investors">
              <span className="value">{data.investoramount}</span>
              <span className="label">investors</span>
            </p>
          </div>
          <div className="info-item">
            <p className="days">
              <span className="value">{data.remainingTimeValue}</span>
              <span className="label">{data.remainingTimeUnit} remaining</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
