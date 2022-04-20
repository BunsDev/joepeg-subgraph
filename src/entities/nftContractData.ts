import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { NftContractData } from "../../generated/schema";
import { BIG_INT_ZERO, WAVAX_ADDRESSES } from "../constants";

export function upsertNftContractData(
  collection: Bytes, 
  currency: Bytes, 
  price: BigInt
): NftContractData {
  let nftContractDataId = collection.toHexString();
  let nftContractData = NftContractData.load(nftContractDataId);

  if (nftContractData === null) {
    nftContractData = new NftContractData(nftContractDataId);
    nftContractData.volumeAVAX = BIG_INT_ZERO;
  }
  // TODO: handle other currencies
  if (WAVAX_ADDRESSES.has(currency.toHexString())) {
    nftContractData.volumeAVAX = nftContractData.volumeAVAX.plus(price);
  }
  nftContractData.save();

  return nftContractData;
}
