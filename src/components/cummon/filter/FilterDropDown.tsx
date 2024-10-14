// src/components/common/FilterDropdown.tsx
import React from "react";
import Button from "../Button";
import { InvesmentsCategories } from "../../../utils/constant";

interface FilterDropdownProps {
  selectedFilters: string[];
  onFilterChange: (filter: string) => void;
  onApply: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedFilters,
  onFilterChange,
  onApply,
}) => {
  return (
    <div className="filter-dropdown">
      {InvesmentsCategories.map((category) => (
        <label key={category}>
          <input
            type="checkbox"
            checked={selectedFilters.includes(category)}
            onChange={() => onFilterChange(category)}
          />
          {category}
        </label>
      ))}

      <Button
        label={"Apply"}
        onClick={onApply}
        color={"white"}
        backgroundColor={"#39958c"}
        borderColor={""}
      />
    </div>
  );
};

export default FilterDropdown;
