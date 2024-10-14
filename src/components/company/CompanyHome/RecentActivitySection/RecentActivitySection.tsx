import React, { useEffect, useMemo, useState } from "react";
import "./RecentActivitySection.css";
import { useUser } from "../../../../context/UserContext";
import { fetchForUser } from "../../../../services/dbService";
import Company from "../../../../models/Company";
import Invest from "../../../../models/Invest";
import GenericUsersTable from "../../../cummon/users-table/GenericTable";
import { Timestamp } from "firebase/firestore";
import OpenAll from "../../../cummon/open-all/OpenAll";

const RecentActivitySection = () => {
  const { user } = useUser();
  const [allInvestments, setAllInvestments] = useState<Invest[]>([]);
  const [displayedInvestments, setDisplayedInvestments] = useState<Invest[]>(
    []
  );
  const [showAll, setShowAll] = useState<boolean>(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
    }).format(amount);
  };

  const toggleUsersDisplay = () => {
    setShowAll(!showAll);
    if (showAll) {
      setDisplayedInvestments(allInvestments.slice(0, 4));
    } else {
      setDisplayedInvestments(allInvestments);
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleDateString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "Investment Amount",
        render: (invest: Invest) => formatCurrency(invest.investAmount),
      },
      {
        header: "Number of Shares",
        render: (invest: Invest) => invest.investNumber.toLocaleString(),
      },
      {
        header: "Date",
        render: (invest: Invest) => formatDate(invest.investDate),
      },
    ],
    []
  );

  useEffect(() => {
    const getData = async () => {
      if (user) {
        try {
          const company = user as Company;
          const Investors = await fetchForUser(
            "investments",
            "companyUid",
            company.uid,
            Invest.fromJson
          );
          setAllInvestments(Investors);
          setDisplayedInvestments(Investors.slice(0, 4)); // Show only the first 4 investments initially
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    getData();
  }, [user]);

  return (
    <>
      <OpenAll
        title={"Recent Investments"}
        onClick={toggleUsersDisplay}
        buttonText={showAll ? "Clear" : "All"}
      />
      <GenericUsersTable
        data={displayedInvestments}
        columns={columns}
        isAdmin={false}
      />
    </>
  );
};

export default RecentActivitySection;
