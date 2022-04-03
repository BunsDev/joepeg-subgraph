import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Sale } from "../../generated/schema";
import { upsertNft } from "./nft";
import { upsertNftContractData } from "./nftContractData";
import { upsertNftContractDailyData } from "./nftContractDailyData";

export function upsertSale(
  amount: BigInt,
  collection: Bytes,
  currency: Bytes,
  isTakerAsk: boolean,
  maker: Bytes,
  orderHash: Bytes,
  orderNonce: BigInt,
  price: BigInt,
  strategy: Bytes,
  taker: Bytes,
  timestamp: BigInt,
  tokenId: BigInt,
  transactionHash: Bytes
) {
  let saleId = transactionHash.toHexString();
  let sale = Sale.load(saleId);

  if (sale === null) {
    sale = new Sale(saleId);
    sale.amount = amount;
    sale.currency = currency;
    sale.isTakerAsk = isTakerAsk;
    sale.maker = maker;
    sale.orderHash = orderHash;
    sale.orderNonce = orderNonce;
    sale.price = price;
    sale.strategy = strategy;
    sale.taker = taker;
    sale.timestamp = timestamp;
    sale.transactionHash = transactionHash;

    let nft = upsertNft(collection, tokenId);
    sale.nft = nft.id;

    // Update contract trade volume
    let nftContractData = upsertNftContractData(collection);
    nftContractData.tradeVolume = nftContractData.tradeVolume.plus(price);
    nftContractData.save();

    // Update contract daily trade volume
    let nftContractDailyData = upsertNftContractDailyData(
      collection,
      timestamp
    );
    nftContractDailyData.tradeVolume =
      nftContractDailyData.tradeVolume.plus(price);
    nftContractDailyData.save();

    sale.save();
  }

  return sale;
}
