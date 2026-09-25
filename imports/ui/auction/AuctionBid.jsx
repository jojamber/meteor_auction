import { useState } from "react";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { BidsCollection } from "/imports/api/BidsCollection";
import { Meteor } from "meteor/meteor";

export const AuctionBid = ({ auctionId, currentPrice }) => {
  const [customIncrement, setCustomIncrement] = useState("");
  const [bidErrorMessage, setBidErrorMessage] = useState("");

  const isLoading = useSubscribe("auctionBids", auctionId);

  const bids = useTracker(() => {
    return BidsCollection.find(
       { auctionId: auctionId },
       { sort: { createdAt: -1 } },
     ).fetch();
  });

  const handleBidSubmit = (increment) => {
    Meteor.call(
      "bids.insert",
      auctionId,
      currentPrice + increment,
      (error) => {
        if (error) {
          setBidErrorMessage(error.reason);
        } else {
          setBidErrorMessage("");
        }
      },
    );
  };

  const submitCustomBid = () => {
    const increment = parseInt(customIncrement, 10);
    if (isNaN(increment) || increment <= 0) {
      setBidErrorMessage("Please enter a valid positive number.");
      return;
    }
    setCustomIncrement("");
    handleBidSubmit(increment);
  };

  if (isLoading()) {
    return <p aria-busy="true">Loading last bids...</p>;
  }

  return (
    <article className="auction-bid">
      <p className="auction-bid-current">Current Bid: {currentPrice} €</p>
      <div className="auction-bid-actions">
      <button onClick={() => handleBidSubmit(100)}>+100</button>
      <button onClick={() => handleBidSubmit(1000)}>+1000</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitCustomBid();
        }}
      >
        <fieldset role="group">
          <input
            type="number"
            className="custom-increment-input"
            min="1"
            placeholder="Enter custom increment"
            value={customIncrement}
            onChange={(e) => setCustomIncrement(e.target.value)}
          ></input>
          <button type="submit">+</button>
        </fieldset>
      </form>
      </div>
      {bidErrorMessage && <p className="form-error">{bidErrorMessage}</p>}
      <small>
        <strong>Last Bids for this auction:</strong>
      </small>
      {bids.length === 0 ? (
        <p>No bids yet. </p>
      ) : (
        <ul className="bid-history-list">
          {bids.map((bid) => (
            <li key={bid._id} className="bid-history-item">
              <span className="bid-time">
                {new Date(bid.createdAt).toLocaleTimeString()}
              </span>
              <span className="bid-name">{bid.bidderName}</span>
              <span className="bid-amount">{bid.amount} €</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
