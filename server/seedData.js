import { AuctionsCollection } from "/imports/api/AuctionsCollection";
import { BidsCollection } from "/imports/api/BidsCollection";
import { ChatCollection } from "/imports/api/ChatCollection";
import { Accounts } from "meteor/accounts-base";

async function insertAuction({ title, description, imageUrl, startingPrice, currentPrice, endTime }) {
  return await AuctionsCollection.insertAsync({ title, description, imageUrl, startingPrice, currentPrice, endTime });
}

async function insertBid({ auctionId, bidderName, userId, amount, createdAt = new Date() }) {
  return await BidsCollection.insertAsync({ auctionId, bidderName, userId, amount, createdAt });
}

async function insertChat({ auctionId, senderName, userId, text, createdAt = new Date() }) {
  return await ChatCollection.insertAsync({ auctionId, senderName, userId, text, createdAt });
}


async function ensureUser(username) {
  const existing = Accounts.findUserByUsername(username);
  if (existing) return existing._id;
  return await Accounts.createUserAsync({ username, password: "test" });
}

export async function seedData() {
  // Prefill Collections if empty
  const aliceId = await ensureUser("Alice");
  const bobId = await ensureUser("Bob");
  const charlieId = await ensureUser("Charlie");
  const davidId = await ensureUser("David");
  const eveId = await ensureUser("Eve");

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
      endTime: Date.now() + 7 * 60 * 60 * 1000, // 7h
    });

    const car_auction_id = await insertAuction({
      title: "Mercedes-Benz 280 CE",
      description:
        "A classic Mercedes-Benz 280 CE from the 1980s. Perfect condion and well-maintained. A true collector's item for car enthusiasts. Don't miss the chance to own this iconic vehicle.",
      imageUrl:
        "https://images.unsplash.com/photo-1686141231719-95d01804be4a?q=80&w=1714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingPrice: 20000,
      currentPrice: 20000,
      endTime: Date.now() + 8 * 60 * 60 * 1000, // 8h
    });
  }

  if ((await BidsCollection.find().countAsync()) === 0) {
    const camera_auction = await AuctionsCollection.findOneAsync({
      title: "Vintage Camera",
    });
    const vase_auction = await AuctionsCollection.findOneAsync({
      title: "Antique Vase",
    });

    // Prefill Collections with bids
    await insertBid({
      auctionId: camera_auction._id,
      bidderName: "Alice",
      userId: aliceId,
      amount: 850,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    });

    await insertBid({
      auctionId: camera_auction._id,
      bidderName: "Bob",
      userId: bobId,
      amount: 900,
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
    });

    await insertBid({
      auctionId: camera_auction._id,
      bidderName: "Charlie",
      userId: charlieId,
      amount: 950,
      createdAt: new Date(Date.now() - 10 * 60 * 1000),
    });

    await insertBid({
      auctionId: camera_auction._id,
      bidderName: "Alice",
      userId: aliceId,
      amount: 1500,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
    });

    await AuctionsCollection.updateAsync(camera_auction._id, {
      $set: { currentPrice: 1500 },
    });

    await insertBid({
      auctionId: vase_auction._id,
      bidderName: "David",
      userId: davidId,
      amount: 4600,
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
    });

    await insertBid({
      auctionId: vase_auction._id,
      bidderName: "Eve",
      userId: eveId,
      amount: 4700,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
    });

    await AuctionsCollection.updateAsync(vase_auction._id, {
      $set: { currentPrice: 4700 },
    });

    //Prefill Collections with chat messages
    if ((await ChatCollection.find().countAsync()) === 0) {
      await insertChat({
        auctionId: camera_auction._id,
        senderName: "Bob",
        userId: bobId,
        text: "lens included or just body?",
        createdAt: new Date(Date.now() - 28 * 60 * 1000),
      });

      await insertChat({
        auctionId: camera_auction._id,
        senderName: "Charlie",
        userId: charlieId,
        text: "looks like just the body from the pics",
        createdAt: new Date(Date.now() - 26 * 60 * 1000),
      });

      await insertChat({
        auctionId: camera_auction._id,
        senderName: "Alice",
        userId: aliceId,
        text: "still works? or just for display",
        createdAt: new Date(Date.now() - 19 * 60 * 1000),
      });

      await insertChat({
        auctionId: camera_auction._id,
        senderName: "Bob",
        userId: bobId,
        text: "good question, description doesnt say",
        createdAt: new Date(Date.now() - 12 * 60 * 1000),
      });

      await insertChat({
        auctionId: camera_auction._id,
        senderName: "Charlie",
        userId: charlieId,
        text: "bidding anyway, cool piece either way",
        createdAt: new Date(Date.now() - 4 * 60 * 1000),
      });

      await insertChat({
        auctionId: vase_auction._id,
        senderName: "David",
        userId: davidId,
        text: "any cracks or repairs on this?",
        createdAt: new Date(Date.now() - 22 * 60 * 1000),
      });

      await insertChat({
        auctionId: vase_auction._id,
        senderName: "Eve",
        userId: eveId,
        text: "cant tell from photos, ask seller",
        createdAt: new Date(Date.now() - 20 * 60 * 1000),
      });

      await insertChat({
        auctionId: vase_auction._id,
        senderName: "David",
        userId: davidId,
        text: "is there a certificate with it",
        createdAt: new Date(Date.now() - 17 * 60 * 1000),
      });

      await insertChat({
        auctionId: vase_auction._id,
        senderName: "Alice",
        userId: aliceId,
        text: "ming dynasty is a big claim without papers",
        createdAt: new Date(Date.now() - 11 * 60 * 1000),
      });

      await insertChat({
        auctionId: vase_auction._id,
        senderName: "Eve",
        userId: eveId,
        text: "fair, but price reflects that risk imo",
        createdAt: new Date(Date.now() - 6 * 60 * 1000),
      });

      await insertChat({
        auctionId: vase_auction._id,
        senderName: "David",
        userId: davidId,
        text: "true, still watching this one",
        createdAt: new Date(Date.now() - 2 * 60 * 1000),
      });
    }
  }
}