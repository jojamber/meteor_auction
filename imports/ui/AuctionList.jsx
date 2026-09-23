import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { AuctionsCollection } from "/imports/api/AuctionsCollection";
import { AuctionCard } from "./AuctionCard";

export const AuctionList = () => {
  const isLoading = useSubscribe("auctions");
  const auctions = useFind(() => AuctionsCollection.find());

  return isLoading() ? (
    <div aria-busy="true">Loading auctions...</div>
  ) : (
    <div>
      <h1>Auctions</h1>

      <section className="auctions-grid">
        {auctions.map((auction) => (
          <article key={auction._id}>
            <AuctionCard auction={auction} />
          </article>
        ))}
      </section>
    </div>
  );
};
