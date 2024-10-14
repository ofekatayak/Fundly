import { createContext, useContext, useEffect, useState } from 'react';
import Invest from '../models/Invest';
import { fetchForUser, fetchUserFromDb, saveToDb } from '../services/dbService';
import { useUser } from './UserContext';
import { useAppStatus } from './AppStatusContext';
import Company from '../models/Company';

interface PurchedContextType {
  userInvestments: Invest[];
  buyInvestment: (investment: Invest) => Promise<void>;
}

const PurchedContext = createContext<PurchedContextType>({
  userInvestments: [],
  buyInvestment: async () => {},
});

export const PurchedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [userInvestments, setInvestments] = useState<Invest[]>([]);
  const { setLoading } = useAppStatus();

  useEffect(() => {
    const fetchInvestments = async () => {
      if (user && user.userType === 'Investor') {
        try {
          setLoading(true);
          console.log('use effect : fetchUserInvestments');
          const investments = await fetchForUser(
            'investments',
            'investorUid',
            user.uid,
            Invest.fromJson
          );
          setInvestments(investments);
        } catch (error) {
          console.error('Error fetching investments:', error);
          // You might want to set an error state here
        } finally {
          setLoading(false);
        }
      } else {
        console.log('use effect : set to Empty Investments');
        setInvestments([]);
      }
    };

    fetchInvestments();
  }, [user]);

  const buyInvestment = async (investment: Invest) => {
    try {
      // Save the new investment to the database
      setLoading(true);
      await saveToDb('investments', investment.investId, investment);
      // update the current amount of the raise amount for the company
      const user = await fetchUserFromDb(investment.companyUid);
      const company = user as Company;
      company.raiseDetails.currentInvestmentsAmount += investment.investAmount;
      await saveToDb('users', company?.uid, company);
      setLoading(false);
      // Update the local state
      setInvestments((prevInvestments) => [...prevInvestments, investment]);

      console.log('Investment added successfully');
    } catch (error) {
      console.error('Error adding investment:', error);
      throw error;
    }
  };

  useEffect(() => {
    console.log('investments:', userInvestments);
  }, [userInvestments]);

  return (
    <PurchedContext.Provider value={{ userInvestments, buyInvestment }}>
      {children}
    </PurchedContext.Provider>
  );
};

export const useUserPurchedContext = () => useContext(PurchedContext);
