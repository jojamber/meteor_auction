import { Link } from 'react-router-dom';
import { CountdownBadge } from './CountdownBadge';


export const AuctionCard = ({ auction }) => {
  const { _id, title, imageUrl, currentPrice, endTime } = auction;
  return (
    <article className="auction-card">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <div className="auction-card-meta">
        <span>Current Price: {currentPrice} €</span>
        <CountdownBadge timeLeft={Date.now()} />
      </div>
      <Link to={`/auction/${_id}`} role="button">
        View Auction
      </Link>
    </article>
  );
}