import { Meteor } from "meteor/meteor";
import { AuctionsCollection } from "/imports/api/AuctionsCollection";
import { BidsCollection } from "/imports/api/BidsCollection";
import { check } from "meteor/check";

async function insertAuction({ title, description, imageUrl, startingPrice, currentPrice, endTime }) {
  return await AuctionsCollection.insertAsync({ title, description, imageUrl, startingPrice, currentPrice, endTime });
}

async function insertBid({ auctionId, bidderName, amount, createdAt = new Date() }) {
  return await BidsCollection.insertAsync({ auctionId, bidderName, amount, createdAt });
}

Meteor.startup(async () => {
  // Prefill Collections if empty
  if ((await AuctionsCollection.find().countAsync()) === 0) {
    const camera_auction_id = await insertAuction({
      title: "Vintage Camera",
      description: "A vintage camera from the 1950s.",
      imageUrl:
        "https://images.unsplash.com/photo-1601854266103-c1dd42130633?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingPrice: 800,
      currentPrice: 800,
      endTime: Date.now() + 4 * 60 * 60 * 1000, // 4h
    });

    const vase_auction_id = await insertAuction({
      title: "Antique Vase",
      description: "An antique vase from the Ming dynasty.",
      imageUrl:
        "https://images.unsplash.com/photo-1723779232054-6f6be572c0e8?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingPrice: 4500,
      currentPrice: 4500,
      endTime: Date.now() + 6 * 60 * 60 * 1000, // 6h
    });

    const bible_auction_id = await insertAuction({
      title: "Rare Bible",
      description: "A rare first edition bible from the 1600s.",
      imageUrl:
        "https://images.unsplash.com/photo-1702397889741-88dc0aabe3b6?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingPrice: 5000,
      currentPrice: 5000,
      endTime: Date.now() + 2 * 60 * 60 * 1000, // 2h
    });

    const car_auction_id = await insertAuction({
      title: "Mercedes-Benz 280 CE",
      description: "A classic Mercedes-Benz 280 CE from the 1980s. Perfect condion and well-maintained. A true collector's item for car enthusiasts. Don't miss the chance to own this iconic vehicle.",
      imageUrl:
        "https://images.unsplash.com/photo-1686141231719-95d01804be4a?q=80&w=1714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingPrice: 20000,
      currentPrice: 20000,
      endTime: Date.now() + 8 * 60 * 60 * 1000, // 8h
    });
  }

  if ((await BidsCollection.find().countAsync()) === 0) {
    const camera_auction = await AuctionsCollection.findOneAsync({ title: "Vintage Camera" });
    const vase_auction = await AuctionsCollection.findOneAsync({ title: "Antique Vase" });

    // Prefill Collections with bids
    await insertBid({
      auctionId: camera_auction._id,
      bidderName: "Alice",
      amount: 850,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    });

    await insertBid({
      auctionId: camera_auction._id,
      bidderName: "Bob",
      amount: 900,
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
    });

    await insertBid({
      auctionId: camera_auction._id,
      bidderName: "Charlie",
      amount: 950,
      createdAt: new Date(Date.now() - 10 * 60 * 1000),
    });

    await insertBid({
      auctionId: camera_auction._id,
      bidderName: "Alice",
      amount: 1500,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
    });

    await insertBid({
      auctionId: vase_auction._id,
      bidderName: "David",
      amount: 4600,
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
    });

    await insertBid({
      auctionId: vase_auction._id,
      bidderName: "Eve",
      amount: 4700,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
    });
  }

  Meteor.publish("auctions", () => {
    return AuctionsCollection.find();
  });

  Meteor.publish("auctionDetails", function (auctionId) {
    check(auctionId, String);
    return AuctionsCollection.find({ _id: auctionId });
  });

  Meteor.publish("auctionBids", function (auctionId) {
    check(auctionId, String);
    return BidsCollection.find({ auctionId: auctionId }, { sort: { createdAt: -1 } });
  });
});

Meteor.methods({
});
