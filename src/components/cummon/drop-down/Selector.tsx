import React, { useState, useEffect } from 'react';
import './Selector.css';

interface GenericSelectorProps {
  options: string[];
  setSelectedValue: (value: string) => void;
  initialValue?: string;
}

const GenericSelector: React.FC<GenericSelectorProps> = ({
  options,
  setSelectedValue,
  initialValue,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    initialValue ?? options[0]
  );

  useEffect(() => {
    if (initialValue !== undefined) {
      setSelectedOption(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    setSelectedValue(selectedOption);
  }, [selectedOption, setSelectedValue]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="selector-container">
      <select
        className="select"
        onChange={handleOptionChange}
        value={selectedOption}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenericSelector;