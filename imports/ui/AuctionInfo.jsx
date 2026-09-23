import { CountdownBadge } from "./CountdownBadge";


export const AuctionInfo = ({ auction }) => {
    const { title, description, imageUrl, currentPrice, startingPrice, endTime } = auction;
  return (
    <article className="auction-info">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <div className="auction-price-row">
        <p><strong>Starting Price: </strong>{startingPrice} €</p>
        <CountdownBadge timeLeft={endTime - Date.now()} />
      </div>
      <strong>Description: </strong>
      <p className="auction-info-description">{description}</p>
    </article>
  );
};