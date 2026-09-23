import { useParams } from 'react-router-dom';
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { AuctionsCollection } from "/imports/api/AuctionsCollection";

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
    <h1>Auction Detail Page for {auctionId}</h1>
  );
}