import { Link } from 'react-router-dom';


export const AuctionCard = ({ auction }) => {
  const { _id, title, imageUrl } = auction;
  return (
    <article className="auction-card">
        <img src={imageUrl} alt={title} />
        <h2>{title}</h2>
        <Link to={`/auction/${_id}`} role="button">View Auction</Link>
    </article>
  );
}