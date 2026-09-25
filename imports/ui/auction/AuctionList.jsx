import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { AuctionsCollection } from "/imports/api/AuctionsCollection";
import { AuctionCard } from "./AuctionCard";

export const AuctionList = () => {
  const isLoading = useSubscribe("auctions");
  const auctions = useFind(() =>
    AuctionsCollection.find({}, { sort: { endTime: 1 } }),
  );

  return isLoading() ? (
    <div aria-busy="true">Loading auctions...</div>
  ) : (
    <>
        <h1>Auctions</h1>
        <hr />
        <section className="auctions-grid">
        {auctions.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} />
        ))}
        </section>
    </>
  );
};
