import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  color: string;
  backgroundColor: string;
  borderColor: string;
  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  color,
  backgroundColor,
  borderColor,
  width,
  height,
  fontSize,
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    color: color,
    border: `2px solid ${borderColor}`,
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    width: width,
    height: height,
    fontSize: fontSize,
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
