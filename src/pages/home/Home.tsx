import { useUser } from "../../context/UserContext";
import { UserType } from "../../utils/enums";
import AdminHome from "../admin/AdminHome";
import CompanyHome from "../company/home/CompanyHome";
import InvestorHome from "../investor/home/InvstorHome";
import GuestHome from "./GuestHome";

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <>
          {user.userType === UserType.Admin && <AdminHome />}
          {user.userType === UserType.Investor && <InvestorHome />}
          {user.userType === UserType.Company && <h1><CompanyHome/></h1>}
        </>
      ) : (
        <GuestHome />
      )}
    </>
  );
};

export default Home;
