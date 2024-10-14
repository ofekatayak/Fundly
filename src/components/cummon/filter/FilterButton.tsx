// src/components/common/FilterButton.tsx
import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import './FilterButton.css';
import { useModal } from '../../../context/popupContext';
import Modal from '../popup/modal';
import FilterDropdown from './FilterDropDown';

interface FilterButtonProps {
  onFilterChange: (selectedFilters: string[]) => void;
  color?: string;
  size?: number;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onFilterChange,
  color = '#39958c',
  size = 25,
}) => {
  const { setModalType, closeModal, modalType } = useModal();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(() => {
    const savedFilters = localStorage.getItem('selectedFilters');
    return savedFilters ? JSON.parse(savedFilters) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const applyFilters = () => {
    onFilterChange(selectedFilters);
    closeModal();
  };

  return (
    <div className="filter-button-container">
      <button className="filter-button" onClick={() => setModalType('Filter')}>
        <FaFilter size={size} color={color} />
      </button>
      {modalType === 'Filter' && (
        <Modal>
          <FilterDropdown
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onApply={applyFilters}
          />
        </Modal>
      )}
    </div>
  );
};

export default FilterButton;
