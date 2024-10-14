import React, { useState, useEffect } from 'react';
import { RaisePurpose } from '../../../utils/constant';
import Company from '../../../models/Company';
import Slider from '@mui/material/Slider';
import { format, isValid, parseISO } from 'date-fns';
import ListSelector from '../../cummon/list-selector/ListSelector';
import { Timestamp } from 'firebase/firestore';

interface RaiseContentFormProps {
  user: Company;
  updateUser: (updatedUser: Company) => void;
}

export const RaiseContentForm: React.FC<RaiseContentFormProps> = ({
  user,
  updateUser,
}) => {
  const [raisedAmount, setRaisedAmount] = useState(
    user.raiseDetails.raisedAmount || 0
  );
  const [targetAmount, setTargetAmount] = useState(
    user.raiseDetails.targetAmount || 1000
  );
  const [deadLine, setDeadline] = useState<Date>(() => {
    return user.raiseDetails.deadline.toDate();
  });
  const [minInvestment, setMinInvestment] = useState(
    user.raiseDetails.minInvestment || 1000
  );
  const [raisePurpose, setRaisePurpose] = useState<string[]>(
    user.raiseDetails.raisePurpose || []
  );

  useEffect(() => {
    setRaisedAmount(user.raiseDetails.raisedAmount || 0);
    setTargetAmount(user.raiseDetails.targetAmount || 1000);
    setDeadline(user.raiseDetails.deadline.toDate());
    setMinInvestment(user.raiseDetails.minInvestment || 1000);
    setRaisePurpose(user.raiseDetails.raisePurpose || []);
  }, [user]);

  useEffect(() => {
    const updatedUser = new Company(
      user.uid,
      user.name,
      user.email,
      user.companyDetails,
      {
        ...user.raiseDetails,
        raisePurpose: raisePurpose,
      },
      user.uploadedDocuments
    );
    updateUser(updatedUser);
  }, [raisePurpose]);

  const setAttr = (
    attrName: string,
    value: string | number | Date | Timestamp
  ) => {
    const updatedUser = new Company(
      user.uid,
      user.name,
      user.email,
      user.companyDetails,
      {
        ...user.raiseDetails,
        [attrName]:
          attrName === 'deadline' ? Timestamp.fromDate(value as Date) : value,
      },
      user.uploadedDocuments
    );
    updateUser(updatedUser);
  };

  const formatValueLabel = (value: number) => {
    if (value >= 1000000) {
      return `${value / 1000000}M`;
    } else {
      return `${value / 1000}K`;
    }
  };

  return (
    <form onSubmit={() => {}}>
      <label>How much money did the company raise until now?</label>
      <input
        type="text"
        required
        value={raisedAmount}
        onChange={(event) => {
          const value = parseInt(event.target.value, 10);
          if (!isNaN(value)) {
            setRaisedAmount(value);
            setAttr('raisedAmount', value);
          }
        }}
      />
      <label>How much money does the company want to raise?</label>
      <Slider
        aria-label="Restricted values"
        value={targetAmount}
        step={1000}
        valueLabelDisplay="off"
        min={1000}
        max={6000000}
        onChange={(e, newValue) => {
          if (typeof newValue === 'number') {
            setTargetAmount(newValue);
            setAttr('targetAmount', newValue);
          }
        }}
        valueLabelFormat={formatValueLabel}
      />
      <input
        type="text"
        required
        value={formatValueLabel(targetAmount)}
        onChange={(e) => {
          const value =
            parseInt(e.target.value.replace(/[KM]/g, ''), 10) * 1000;
          if (!isNaN(value)) {
            setTargetAmount(value);
            setAttr('targetAmount', value);
          }
        }}
        style={{
          textAlign: 'center',
          color: `var(--primary-color)`,
          fontWeight: 'bold',
        }}
      />
      <label>What's your estimated deadline for the raise?</label>
      <input
        type="date"
        required
        value={format(deadLine, 'yyyy-MM-dd')}
        onChange={(e) => {
          const newDate = parseISO(e.target.value);
          if (isValid(newDate)) {
            setDeadline(newDate);
            setAttr('deadline', newDate);
          }
        }}
      />
      <label>Minimum investment per person?</label>
      <Slider
        aria-label="Restricted values"
        value={minInvestment}
        step={1000}
        valueLabelDisplay="off"
        min={1000}
        max={1000000}
        onChange={(e, newValue) => {
          if (typeof newValue === 'number') {
            setMinInvestment(newValue);
            setAttr('minInvestment', newValue);
          }
        }}
        valueLabelFormat={formatValueLabel}
      />
      <input
        type="text"
        required
        value={formatValueLabel(minInvestment)}
        onChange={(e) => {
          const value =
            parseInt(e.target.value.replace(/[KM]/g, ''), 10) * 1000;
          if (!isNaN(value)) {
            setMinInvestment(value);
            setAttr('minInvestment', value);
          }
        }}
        style={{
          textAlign: 'center',
          color: `var(--primary-color)`,
          fontWeight: 'bold',
        }}
      />
      <label>What's the raise purpose?</label>
      <ListSelector
        initialList={raisePurpose}
        list={RaisePurpose}
        setList={setRaisePurpose}
      />
    </form>
  );
};
