import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuctionList } from './AuctionList';
import { AuctionDetail } from './AuctionDetail';

export const App = () => (
  <BrowserRouter>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/auction/1259">Auction</Link>
    </nav>

    <Routes>
      <Route path="/" element={<><h1>Home Page</h1><AuctionList /></>} />
      <Route path="/auction/:auctionId" element={<AuctionDetail />} />
    </Routes>
  </BrowserRouter>
);
