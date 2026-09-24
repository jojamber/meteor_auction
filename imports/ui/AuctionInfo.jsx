import { CountdownBadge } from "./CountdownBadge";
import { useCurrentUser } from "./UserContext";


export const AuctionInfo = ({ auction }) => {
    const { title, description, imageUrl, currentPrice, startingPrice, endTime } = auction;
  return (
    <article className="auction-info">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <div className="auction-price-row">
        <p>
          <strong>Starting Price: </strong>
          {startingPrice} €
        </p>
        <CountdownBadge timeLeft={endTime - Date.now()} />
      </div>
      <strong>Description: </strong>
      <p className="auction-info-description">{description}</p>
      <p>Test: {useCurrentUser() ? "eingeloggt" : "nicht eingeloggt"}</p>
    </article>
  );
};