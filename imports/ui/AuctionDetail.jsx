import { useParams } from 'react-router-dom';

export const AuctionDetail = () => {
  const { auctionId } = useParams();

  return (
    <h1>Auction Detail Page for {auctionId}</h1>
  );
}