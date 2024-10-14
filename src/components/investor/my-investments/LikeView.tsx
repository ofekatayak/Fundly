import React from 'react';
import { useNavigate } from 'react-router-dom';
import Company from '../../../models/Company';
import { RoutePath } from '../../../utils/enums';
import NoData from '../../cummon/no-data/NoData';
import InvestmentList from '../../cummon/invest-card/InvestList';
import Button from '../../cummon/Button';
import noDataImg from '../../../assets/images/no_data.png';

interface LikedCompaniesViewProps {
  companies: Company[];
  title: string;
}

const LikedCompaniesView: React.FC<LikedCompaniesViewProps> = ({
  companies,
  title,
}) => {
  const navigate = useNavigate();

  const handleFindInvestments = () => {
    navigate(RoutePath.SearchInvests);
  };

  if (companies.length === 0) {
    return <EmptyLikeView onFindInvestments={handleFindInvestments} />;
  }

  return <PopulatedLikeView title={title} companies={companies} />;
};

const EmptyLikeView: React.FC<{ onFindInvestments: () => void }> = ({
  onFindInvestments,
}) => (
  <>
    <NoData img={noDataImg} messeage={"You haven't saved any investments"} />
    <Button
      label={'Find Investments!'}
      onClick={onFindInvestments}
      color={'white'}
      backgroundColor={'#39958c'}
      borderColor={''}
    />
  </>
);

const PopulatedLikeView: React.FC<{ title: string; companies: Company[] }> = ({
  title,
  companies,
}) => (
  <div>
    <h2 style={{ color: '#728f9e' }}>{title}</h2>
    <InvestmentList companies={companies} />
  </div>
);

export default LikedCompaniesView;
