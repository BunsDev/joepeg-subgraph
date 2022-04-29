import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { CancelledAllOrder } from "../../generated/schema";

export function upsertCancelledAllOrder(
  newMinNonce: BigInt,
  timestamp: BigInt,
  transactionHash: Bytes,
  user: Bytes
): CancelledAllOrder {
  let cancelledAllOrderId = transactionHash.toHexString();
  let cancelledAllOrder = CancelledAllOrder.load(cancelledAllOrderId);

  if (cancelledAllOrder === null) {
    cancelledAllOrder = new CancelledAllOrder(cancelledAllOrderId);
    cancelledAllOrder.newMinNonce = newMinNonce;
    cancelledAllOrder.timestamp = timestamp;
    cancelledAllOrder.transactionHash = transactionHash;
    cancelledAllOrder.user = user;

    cancelledAllOrder.save();
  }

  return cancelledAllOrder;
}
