import React, { useState, useEffect } from 'react';
import './YesNoSelector.css';

interface YesNoSelectorProps {
  setYesNo: (value: boolean) => void;
  initialValue?: boolean;
}

const YesNoSelector: React.FC<YesNoSelectorProps> = ({ setYesNo, initialValue }) => {
  const [selectedValue, setSelectedValue] = useState<string>(initialValue ? 'yes' : 'no');

  useEffect(() => {
    if (initialValue !== undefined) {
      setSelectedValue(initialValue ? 'yes' : 'no');
    }
  }, [initialValue]);

  const handleYesNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    setYesNo(value === 'yes');
  };

  return (
    <div className="yes-no-container">
      <label>
        <input
          type="radio"
          name="yesNo"
          value="yes"
          checked={selectedValue === 'yes'}
          onChange={handleYesNoChange}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="yesNo"
          value="no"
          checked={selectedValue === 'no'}
          onChange={handleYesNoChange}
        />
        No
      </label>
    </div>
  );
};

export default YesNoSelector;