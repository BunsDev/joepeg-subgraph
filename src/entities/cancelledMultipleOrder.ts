import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { CancelledMultipleOrder } from "../../generated/schema";

export function upsertCanceledMultipleOrders(
  orderNonces: BigInt[],
  timestamp: BigInt,
  transactionHash: Bytes,
  user: Bytes
): CancelledMultipleOrder {
  let cancelledMultipleOrderId = transactionHash.toHexString();
  let cancelledMultipleOrder = CancelledMultipleOrder.load(
    cancelledMultipleOrderId
  );

  if (cancelledMultipleOrder === null) {
    cancelledMultipleOrder = new CancelledMultipleOrder(
      cancelledMultipleOrderId
    );
    cancelledMultipleOrder.orderNonces = orderNonces;
    cancelledMultipleOrder.timestamp = timestamp;
    cancelledMultipleOrder.transactionHash = transactionHash;
    cancelledMultipleOrder.user = user;

    cancelledMultipleOrder.save();
  }

  return cancelledMultipleOrder;
}
