import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { CanceledAllOrders } from "../../generated/schema";

export function getCanceledAllOrders(
  newMinNonce: BigInt,
  timestamp: BigInt,
  transactionHash: Bytes,
  user: Bytes
) {
  let canceledAllOrdersId = transactionHash.toHexString();
  let canceledAllOrders = CanceledAllOrders.load(canceledAllOrdersId);

  if (canceledAllOrders === null) {
    canceledAllOrders = new CanceledAllOrders(canceledAllOrdersId);
    canceledAllOrders.newMinNonce = newMinNonce;
    canceledAllOrders.timestamp = timestamp;
    canceledAllOrders.transactionHash = transactionHash;
    canceledAllOrders.user = user;
  }

  return canceledAllOrders;
}
