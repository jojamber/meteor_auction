import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { BidsCollection } from "/imports/api/BidsCollection";

export const AuctionBid = ( { auctionId }) => {
    const isLoading = useSubscribe("auctionBids", auctionId);

    const bids = useTracker(() => {
        return BidsCollection.find({ auctionId: auctionId }).fetch();
    });

    if (isLoading()) {
        return <p aria-busy="true">Loading last bids...</p>;
    }

    return (
      <article className="auction-bid">
        <small>
          <strong>Last Bids for this auction:</strong>
        </small>
        {bids.length === 0 ? (
          <p>No bids yet. </p>
        ) : (
          <ul className="bid-history-list">
            {bids.map((bid) => (
              <li key={bid._id} className="bid-history-item">
                <span className="bid-time">{new Date(bid.createdAt).toLocaleTimeString()}</span>
                <span className="bid-name">{bid.bidderName}</span>
                <span className="bid-amount">{bid.amount} €</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    );
}