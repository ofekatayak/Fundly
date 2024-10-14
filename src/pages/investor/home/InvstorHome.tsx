import { LikesProvider } from '../../../context/LikesContext';
import { PurchedProvider } from '../../../context/PurchedContext';
import GuestHome from '../../home/GuestHome';

const InvestorHome: React.FC = () => {
  return (
    <>
      <PurchedProvider>
        <LikesProvider>
          <GuestHome />
        </LikesProvider>
      </PurchedProvider>
    </>
  );
};

export default InvestorHome;
