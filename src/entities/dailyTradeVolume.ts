import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { DailyTradeVolume } from "../../generated/schema";
import { BIG_INT_ZERO } from "../constants";

export function upsertDailyTradeVolume(
  nftContractDailyDataId: string,
  currency: Bytes,
  volume: BigInt
): DailyTradeVolume {
  let dailyTradeVolumeId =
    nftContractDailyDataId + "-" + currency.toHexString();
  let dailyTradeVolume = DailyTradeVolume.load(dailyTradeVolumeId);

  if (dailyTradeVolume === null) {
    dailyTradeVolume = new DailyTradeVolume(dailyTradeVolumeId);
    dailyTradeVolume.currency = currency;
    dailyTradeVolume.nftContractDailyData = nftContractDailyDataId;
    dailyTradeVolume.volume = BIG_INT_ZERO;
  }

  dailyTradeVolume.volume = dailyTradeVolume.volume.plus(volume);
  dailyTradeVolume.save();

  return dailyTradeVolume;
}
