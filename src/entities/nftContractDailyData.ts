import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { NftContractDailyData } from "../../generated/schema";
import { BIG_INT_ZERO } from "../constants";

const SECONDS_PER_DAY = 60 * 60 * 24;

export function getNftContractDailyData(
  collection: Address,
  timestamp: BigInt
) {
  let collectionHexString = collection.toHexString();
  let dailyIntervalTimestamp =
    (timestamp.toI32() / SECONDS_PER_DAY) * SECONDS_PER_DAY;
  let nftContractDailyDataId =
    collectionHexString + "-" + dailyIntervalTimestamp.toString();
  let nftContractDailyData = NftContractDailyData.load(nftContractDailyDataId);

  if (nftContractDailyData === null) {
    nftContractDailyData = new NftContractDailyData(nftContractDailyDataId);
    nftContractDailyData.contract = collectionHexString;
    nftContractDailyData.timestamp = BigInt.fromI32(dailyIntervalTimestamp);
    nftContractDailyData.tradeVolume = BIG_INT_ZERO;
  }

  return nftContractDailyData;
}
