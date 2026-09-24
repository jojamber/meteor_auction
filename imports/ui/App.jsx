import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuctionList } from './AuctionList';
import { AuctionDetail } from './AuctionDetail';
import { UserProvider } from './UserContext';
import { AuthModal } from './AuthModal';

export const App = () => (
  <BrowserRouter>
    <UserProvider>
      <main className="container">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/auction/1259">Auction</Link>
        </nav>

        <AuthModal />

        <Routes>
          <Route path="/" element={<AuctionList />} />
          <Route path="/auction/:auctionId" element={<AuctionDetail />} />
        </Routes>
      </main>
    </UserProvider>
  </BrowserRouter>
);
