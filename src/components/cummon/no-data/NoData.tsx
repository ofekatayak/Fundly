import React from 'react';
import './NoData.css'; // Make sure to create this CSS file

interface NoDataProps {
  img: string;
  messeage: string;
  imageSize?: {
    width?: number | string;
    height?: number | string;
  };
}

const NoData: React.FC<NoDataProps> = ({ img, messeage, imageSize }) => {
  const defaultSize = {
    height: 430,
    width: 'auto',
  };

  const imgStyle = {
    height: imageSize?.height || defaultSize.height,
    width: imageSize?.width || defaultSize.width,
  };

  return (
    <div className="no-data-container">
      <img style={imgStyle} src={img} alt="No_data" className="no-data-image" />
      <h3 className="no-data-message">{messeage}</h3>
    </div>
  );
};

export default NoData;
