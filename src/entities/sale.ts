import {
  Address,
  BigDecimal,
  BigInt,
  Bytes,
  ethereum,
} from "@graphprotocol/graph-ts";
import { Sale } from "../../generated/schema";

export function getSale(
  amount: BigInt,
  collection: Bytes,
  currency: Bytes,
  isOrderAsk: boolean,
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
  let collectionHexString = collection.toHexString();
  let saleId = transactionHash.toHexString();
  let sale = Sale.load(saleId);

  if (sale === null) {
    sale = new Sale(saleId);
    sale.amount = amount;
    sale.currency = sale.currency;
    sale.isOrderAsk = isOrderAsk;
    sale.maker = maker;
    sale.nft = collectionHexString + "-" + tokenId.toString();
    sale.orderHash = orderHash;
    sale.orderNonce = orderNonce;
    sale.price = price;
    sale.strategy = strategy;
    sale.taker = taker;
    sale.timestamp = timestamp;
    sale.transactionHash = transactionHash;
  }

  return sale;
}
