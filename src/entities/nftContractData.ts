import { Bytes } from "@graphprotocol/graph-ts";
import { NftContractData } from "../../generated/schema";
import { BIG_INT_ZERO } from "../constants";

export function upsertNftContractData(collection: Bytes): NftContractData {
  let nftContractDataId = collection.toHexString();
  let nftContractData = NftContractData.load(nftContractDataId);

  if (nftContractData === null) {
    nftContractData = new NftContractData(nftContractDataId);
    nftContractData.save();
  }

  return nftContractData;
}
