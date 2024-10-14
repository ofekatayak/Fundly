import React from 'react';
import { extractFileName } from '../../../../../utils/functions';
import fileNoPlus from '../../../../../assets/images/file_No_Plus.jpg';
import './CompanyDocs.css';
import Company from '../../../../../models/Company';
import NoData from '../../../../cummon/no-data/NoData';
import NoDataImg from '../../../../../assets/images/no_data.png';

interface docsProps {
  company: Company;
}

export const CompanyDocs: React.FC<docsProps> = ({ company }) => {
  const { uploadedDocuments } = company;

  return (
    <div className="docs-container">
      <h2 className="docs-title">Docs</h2>
      <div className="document-links">
        {uploadedDocuments.length == 0 ? (
          <NoData
            img={NoDataImg}
            messeage={'No Docs!'}
            imageSize={{ height: 50 }}
          />
        ) : (
          uploadedDocuments.map((docAddress, index) => (
            <a href={docAddress} key={index} className="document-card" download>
              <img
                src={fileNoPlus}
                alt="Document icon"
                className="document-icon"
              />
              <div className="title">{extractFileName(docAddress)}</div>
              <div className="document-preview">
                <img
                  src={docAddress}
                  alt="Document preview"
                  className="preview-image"
                />
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};
