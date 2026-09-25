import { CountdownBadge } from "./CountdownBadge";


export const AuctionInfo = ({ auction }) => {
    const { title, description, imageUrl, startingPrice, endTime } = auction;
    
  return (
    <article className="auction-info">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <div className="auction-price-row">
        <p>
          <strong>Starting Price: </strong>
          {startingPrice} €
        </p>
        <CountdownBadge endTime={endTime} />
      </div>
      <strong>Description: </strong>
      <p className="auction-info-description">{description}</p>
    </article>
  );
};