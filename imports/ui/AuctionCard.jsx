import { Link } from 'react-router-dom';


export const AuctionCard = ({ auction }) => {
  const { _id, title, imageUrl } = auction;
  return (
    <div className="auction-card">
        <img src={imageUrl} alt={title} width="100" />
        <h2>{title}</h2>
        <Link to={`/auction/${_id}`}>View Auction</Link>
    </div>
  );
}