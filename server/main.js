import { Meteor } from "meteor/meteor";
import { AuctionsCollection } from "/imports/api/AuctionsCollection";
import { BidsCollection } from "/imports/api/BidsCollection";
import { check } from "meteor/check";

async function insertAuction({ title, description, imageUrl, startingPrice, currentPrice, endTime }) {
  await AuctionsCollection.insertAsync({ title, description, imageUrl, startingPrice, currentPrice, endTime });
}

Meteor.startup(async () => {
  // Prefill AuctionsCollection if empty
  if ((await AuctionsCollection.find().countAsync()) === 0) {
    await insertAuction({
      title: "Vintage Camera",
      description: "A vintage camera from the 1950s.",
      imageUrl:
        "https://images.unsplash.com/photo-1601854266103-c1dd42130633?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingPrice: 800,
      currentPrice: 800,
      endTime: Date.now() + 4 * 60 * 60 * 1000, // 4h
    });

    await insertAuction({
      title: "Antique Vase",
      description: "An antique vase from the Ming dynasty.",
      imageUrl:
        "https://images.unsplash.com/photo-1723779232054-6f6be572c0e8?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingPrice: 4500,
      currentPrice: 4500,
      endTime: Date.now() + 6 * 60 * 60 * 1000, // 6h
    });

    await insertAuction({
      title: "Rare Bible",
      description: "A rare first edition bible from the 1600s.",
      imageUrl:
        "https://images.unsplash.com/photo-1702397889741-88dc0aabe3b6?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingPrice: 5000,
      currentPrice: 5000,
      endTime: Date.now() + 2 * 60 * 60 * 1000, // 2h
    });

    await insertAuction({
      title: "Mercedes-Benz 280 CE",
      description: "A classic Mercedes-Benz 280 CE from the 1980s. Perfect condion and well-maintained. A true collector's item for car enthusiasts. Don't miss the chance to own this iconic vehicle.",
      imageUrl:
        "https://images.unsplash.com/photo-1686141231719-95d01804be4a?q=80&w=1714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingPrice: 20000,
      currentPrice: 20000,
      endTime: Date.now() + 8 * 60 * 60 * 1000, // 8h
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
    return BidsCollection.find({ _id: auctionId }, { sort: { createdAt: -1 } });
  });
});

Meteor.methods({
});
