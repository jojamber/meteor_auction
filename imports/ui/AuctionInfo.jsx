import { CountdownBadge } from "./CountdownBadge";


export const AuctionInfo = ({ auction }) => {
    const { title, description, imageUrl, currentPrice, startingPrice, endTime } = auction;
  return (
    <article className="auction-info">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <label>Starting Price</label>
      <p>{startingPrice} €</p>
      <CountdownBadge timeLeft={endTime - Date.now()} />
      <label>Description: </label>
      <p>{description}</p>
    </article>
  );
};