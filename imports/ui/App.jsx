import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Header } from './layout/Header';
import { AuctionList } from './auction/AuctionList';
import { AuctionDetail } from './auction/AuctionDetail';
import { UserProvider } from './auth/UserContext';
import { AuthModal } from './auth/AuthModal';

export const App = () => (
  <BrowserRouter>
    <UserProvider>
      <main className="container">
        <Header />

        <AuthModal />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<AuctionList />} />
            <Route path="/auction/:auctionId" element={<AuctionDetail />} />
          </Routes>
        </div>
      </main>
    </UserProvider>
  </BrowserRouter>
);
