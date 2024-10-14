// src/App.tsx
import React from 'react';
import './assets/styles/colors.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoutePath } from './utils/enums';
import { AppStatusProvider } from './context/AppStatusContext';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/popupContext';
import Home from './pages/home/Home';
import { LikesProvider } from './context/LikesContext';
import Header from './components/cummon/header/Header';
import SearchInvestments from './pages/investor/all-investments/SearchInvest';
import MyInvestments from './pages/investor/my-investments/myInvestments';
import { CompanyListProvider } from './context/CompanyListContext';
import { PurchedProvider } from './context/PurchedContext';
import CompanyProfile from './pages/company/company-profile/companyProfile';
import { NotificationProvider } from './context/NotificationsContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const CommonProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <UserProvider>
      <AppStatusProvider>
        <CompanyListProvider>
          <NotificationProvider>
            <ModalProvider>{children}</ModalProvider>
          </NotificationProvider>
        </CompanyListProvider>
      </AppStatusProvider>
    </UserProvider>
  );
};

// Routes her
const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutePath.Home} element={<Home />} />
      <Route path={RoutePath.SearchInvests} element={<SearchInvestments />} />

      <Route
        path={RoutePath.MyInvestments}
        element={
          <>
            <LikesProvider>
              <MyInvestments />
            </LikesProvider>
          </>
        }
      />
      <Route
        path={RoutePath.CompanyProfile + '/:companyId'}
        element={<CompanyProfile />}
      />
    </Routes>
  );
};

// HER THE APP START
const App: React.FC = () => {
  return (
    <CommonProviders>
      <PurchedProvider>
        <Router>
          <Header>
            <AppContent />
          </Header>
        </Router>
      </PurchedProvider>
    </CommonProviders>
  );
};

export default App;
