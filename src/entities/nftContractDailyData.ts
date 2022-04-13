import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { NftContractDailyData } from "../../generated/schema";
import { BIG_INT_ZERO } from "../constants";
import { upsertNftContractData } from "./nftContractData";

const SECONDS_PER_DAY = 60 * 60 * 24;

export function upsertNftContractDailyData(
  collection: Bytes,
  timestamp: BigInt
): NftContractDailyData {
  let collectionHexString = collection.toHexString();
  let dailyIntervalTimestamp =
    (timestamp.toI32() / SECONDS_PER_DAY) * SECONDS_PER_DAY;
  let nftContractDailyDataId =
    collectionHexString + "-" + dailyIntervalTimestamp.toString();
  let nftContractDailyData = NftContractDailyData.load(nftContractDailyDataId);

  if (nftContractDailyData === null) {
    nftContractDailyData = new NftContractDailyData(nftContractDailyDataId);
    nftContractDailyData.timestamp = BigInt.fromI32(dailyIntervalTimestamp);

    let nftContractData = upsertNftContractData(collection);
    nftContractDailyData.contract = nftContractData.id;

    nftContractDailyData.save();
  }

  return nftContractDailyData;
}
