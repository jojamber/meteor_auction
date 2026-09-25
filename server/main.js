import { Meteor } from "meteor/meteor";
import { AuctionsCollection } from "/imports/api/AuctionsCollection";
import { BidsCollection } from "/imports/api/BidsCollection";
import {ChatCollection} from "/imports/api/ChatCollection";
import { check } from "meteor/check";
import { seedData } from "./seedData";

async function insertBid({ auctionId, bidderName, userId, amount, createdAt = new Date() }) {
  return await BidsCollection.insertAsync({ auctionId, bidderName, userId, amount, createdAt });
}

async function insertChat({ auctionId, senderName, userId, text, createdAt = new Date() }) {
  return await ChatCollection.insertAsync({ auctionId, senderName, userId, text, createdAt });
}


Meteor.startup(async () => {
  
  // Seed data if collections are empty
  await seedData();

  
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

  Meteor.publish("auctionChat", function (auctionId) {
    check(auctionId, String);
    return ChatCollection.find({ auctionId: auctionId }, { sort: { createdAt: 1 } });
  });
});

Meteor.methods({
  "bids.insert": async function (auctionId, amount) {
    check(auctionId, String);
    check(amount, Number);

    if (!(this.userId)) {
      throw new Meteor.Error("not-authorized", "Not authorized. ");
    }

    const user = await Meteor.users.findOneAsync(this.userId);

    const result = await AuctionsCollection.updateAsync({ _id: auctionId, currentPrice: { $lt: amount } }, { $set: { currentPrice: amount } });
    if (result === 0) {
      // Race condition: Another bid was placed before this one. 
      throw new Meteor.Error("bid-too-low", "Bid amount is not the highest any more.");
    }

    return insertBid({ auctionId, bidderName: user.username, userId: this.userId, amount, createdAt: new Date() });
  },

  "chat.insert": async function (auctionId, text) {
    check(auctionId, String);
    check(text, String);
    
    if (!(this.userId)) {
      throw new Meteor.Error("not-authorized", "Not authorized. ");
    }

    const user = await Meteor.users.findOneAsync(this.userId);

    return insertChat({ auctionId, senderName: user.username, userId: this.userId, text, createdAt: new Date() });
  },
});