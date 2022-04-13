import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { TradeVolume } from "../../generated/schema";
import { BIG_INT_ZERO } from "../constants";

export function upsertTradeVolume(
  nftContractDataId: string,
  currency: Bytes,
  volume: BigInt
): TradeVolume {
  let tradeVolumeId = nftContractDataId + "-" + currency.toHexString();
  let tradeVolume = TradeVolume.load(tradeVolumeId);

  if (tradeVolume === null) {
    tradeVolume = new TradeVolume(tradeVolumeId);
    tradeVolume.currency = currency;
    tradeVolume.nftContractData = nftContractDataId;
    tradeVolume.volume = BIG_INT_ZERO;
  }

  tradeVolume.volume = tradeVolume.volume.plus(volume);
  tradeVolume.save();

  return tradeVolume;
}
