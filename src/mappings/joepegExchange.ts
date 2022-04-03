import {
  CancelAllOrders,
  CancelMultipleOrders,
  TakerAsk,
  TakerBid,
} from "../../generated/JoepegExchange/JoepegExchange";
import { BIG_INT_ONE } from "../constants";
import { upsertSale } from "../entities/sale";

export function handleTakerAsk(event: TakerAsk): void {
  upsertSale(
    event.params.amount,
    event.params.collection,
    event.params.currency,
    true, // isTakerAsk
    event.params.maker,
    event.params.orderHash,
    event.params.orderNonce,
    event.params.price,
    event.params.strategy,
    event.params.taker,
    event.block.timestamp,
    event.params.tokenId,
    event.transaction.hash
  );
}

export function handleTakerBid(event: TakerBid): void {
  upsertSale(
    event.params.amount,
    event.params.collection,
    event.params.currency,
    false, // isTakerAsk
    event.params.maker,
    event.params.orderHash,
    event.params.orderNonce,
    event.params.price,
    event.params.strategy,
    event.params.taker,
    event.block.timestamp,
    event.params.tokenId,
    event.transaction.hash
  );
}
