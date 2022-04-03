import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { CanceledAllOrders } from "../../generated/schema";

export function upsertCanceledAllOrders(
  newMinNonce: BigInt,
  timestamp: BigInt,
  transactionHash: Bytes,
  user: Bytes
): CanceledAllOrders {
  let canceledAllOrdersId = transactionHash.toHexString();
  let canceledAllOrders = CanceledAllOrders.load(canceledAllOrdersId);

  if (canceledAllOrders === null) {
    canceledAllOrders = new CanceledAllOrders(canceledAllOrdersId);
    canceledAllOrders.newMinNonce = newMinNonce;
    canceledAllOrders.timestamp = timestamp;
    canceledAllOrders.transactionHash = transactionHash;
    canceledAllOrders.user = user;

    canceledAllOrders.save();
  }

  return canceledAllOrders;
}
