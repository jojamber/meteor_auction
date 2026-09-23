import { useParams } from 'react-router-dom';
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { AuctionsCollection } from "/imports/api/AuctionsCollection";
import { AuctionInfo } from "./AuctionInfo";
import { AuctionBid } from "./AuctionBid";
import { AuctionChat } from "./AuctionChat";

export const AuctionDetail = () => {
  const { auctionId } = useParams();
  const isLoading = useSubscribe("auctionDetails", auctionId);

  const auction = useTracker(() => AuctionsCollection.findOne({ _id: auctionId }));

  if (isLoading()) {
    return <p aria-busy="true">Loading...</p>;
  }

  if (!auction) {
    return <p>Auction not found.</p>;
  }

  return (
    <div className="auction-detail">
      <div className="auction-detail-left">
        <AuctionInfo auction={auction} />
        <AuctionBid auctionId={auctionId} />
      </div>
      <AuctionChat />
    </div>
  );
}