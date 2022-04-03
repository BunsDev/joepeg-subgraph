import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { NftContractData } from "../../generated/schema";
import { BIG_INT_ZERO } from "../constants";

export function upsertNftContractData(collection: Address) {
  let nftContractDataId = collection.toHexString();
  let nftContractData = NftContractData.load(nftContractDataId);

  if (nftContractData === null) {
    nftContractData = new NftContractData(nftContractDataId);
    nftContractData.tradeVolume = BIG_INT_ZERO;

    nftContractData.save();
  }

  return nftContractData;
}
