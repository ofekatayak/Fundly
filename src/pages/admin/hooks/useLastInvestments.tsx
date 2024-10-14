import { useState, useEffect, useMemo } from "react";
import Company from "../../../models/Company";
import Invest from "../../../models/Invest";
import Investor from "../../../models/Investor";
import { fetchAllInvestments, fetchForUser } from "../../../services/dbService";
import { Timestamp } from "firebase/firestore";

class EnrichedInvest extends Invest {
  investorName: string;
  companyName: string;

  constructor(invest: Invest, investorName: string, companyName: string) {
    super(
      invest.investorUid,
      invest.companyUid,
      invest.investNumber,
      invest.investAmount,
      invest.investId
    );
    this.investorName = investorName;
    this.companyName = companyName;
  }
}

export const useLastInvestments = (limitedRowsCount: number) => {
  const [investments, setInvestments] = useState<EnrichedInvest[]>([]);
  const [displayedInvestments, setDisplayedInvestments] = useState<
    EnrichedInvest[]
  >([]);
  const [showAllInvestments, setShowAllInvestments] = useState(false);

  useEffect(() => {
    const loadInvestments = async () => {
      try {
        const fetchedInvestments = await fetchAllInvestments();
        const investors = await fetchForUser(
          "users",
          "userType",
          "Investor",
          Investor.fromJson
        );
        const companies = await fetchForUser(
          "users",
          "userType",
          "Company",
          Company.fromJson
        );

        const enrichedInvestments: EnrichedInvest[] = fetchedInvestments.map(
          (invest) => {
            const investor = investors.find(
              (inv) => inv.uid === invest.investorUid
            );
            const company = companies.find(
              (comp) => comp.uid === invest.companyUid
            );
            return new EnrichedInvest(
              invest,
              investor?.name || "Unknown Investor",
              company?.name || "Unknown Company"
            );
          }
        );

        // Sort investments by date (assuming investNumber is a timestamp or sequential number)
        enrichedInvestments.sort((a, b) => b.investNumber - a.investNumber);

        setInvestments(enrichedInvestments);
        setDisplayedInvestments(enrichedInvestments.slice(0, limitedRowsCount));
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    };
    loadInvestments();
  }, [limitedRowsCount]);

  const toggleInvestmentsDisplay = () => {
    if (showAllInvestments) {
      setDisplayedInvestments(investments.slice(0, limitedRowsCount));
    } else {
      setDisplayedInvestments(investments);
    }
    setShowAllInvestments(!showAllInvestments);
  };

  const columns = useMemo(
    () => [
      {
        header: "Investor",
        render: (invest: EnrichedInvest) => invest.investorName,
      },
      {
        header: "Company",
        render: (invest: EnrichedInvest) => invest.companyName,
      },
      {
        header: "Investment Amount",
        render: (invest: EnrichedInvest) =>
          `${invest.investAmount.toLocaleString()}₪`,
      },
      {
        header: "Date",
        render: (invest: EnrichedInvest) => {
          if (invest.investDate instanceof Timestamp) {
            return invest.investDate.toDate().toLocaleDateString("he-IL", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });
          } else {
            // Fallback in case investDate is not a Timestamp
            return "Date not available";
          }
        },
      },
    ],
    []
  );
  return {
    displayedInvestments,
    showAllInvestments,
    toggleInvestmentsDisplay,
    columns,
  };
};
