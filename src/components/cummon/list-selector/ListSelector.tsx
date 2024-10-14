import React, { useState, useEffect } from 'react';
import './ListSelector.css';

interface ListSelectorProps {
  list: string[];
  setList: (categories: string[]) => void;
  initialList?: string[];
}

const ListSelector: React.FC<ListSelectorProps> = ({
  setList,
  list,
  initialList = [],
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(initialList);

  const handleCategoryClick = (category: string) => {
    setSelectedValues((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  useEffect(() => {
    setList(selectedValues);
  }, [selectedValues, setList]);

  useEffect(() => {
    if (initialList.length > 0) {
      setSelectedValues(initialList);
    }
  }, [initialList]);

  return (
    <div>
      <div className="container">
        {list.map((value: string) => (
          <button
            key={value}
            className={`value-button ${
              selectedValues.includes(value) ? 'selected' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleCategoryClick(value);
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListSelector;