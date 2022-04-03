import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { CanceledMultipleOrders } from "../../generated/schema";

export function getCanceledMultipleOrders(
  orderNonces: BigInt[],
  timestamp: BigInt,
  transactionHash: Bytes,
  user: Bytes
) {
  let canceledMultipleOrdersId = transactionHash.toHexString();
  let canceledMultipleOrders = CanceledMultipleOrders.load(
    canceledMultipleOrdersId
  );

  if (canceledMultipleOrders === null) {
    canceledMultipleOrders = new CanceledMultipleOrders(
      canceledMultipleOrdersId
    );
    canceledMultipleOrders.orderNonces = orderNonces;
    canceledMultipleOrders.timestamp = timestamp;
    canceledMultipleOrders.transactionHash = transactionHash;
    canceledMultipleOrders.user = user;
  }

  return canceledMultipleOrders;
}
