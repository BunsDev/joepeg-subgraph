import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Nft } from "../../generated/schema";
import { upsertNftContractData } from "./nftContractData";

export function upsertNft(collection: Address, tokenId: BigInt) {
  let collectionHexString = collection.toHexString();
  let nftId = collectionHexString + "-" + tokenId.toString();
  let nft = Nft.load(nftId);

  if (nft === null) {
    nft = new Nft(nftId);
    nft.tokenId = tokenId;

    let nftContractData = upsertNftContractData(collection);
    nft.contract = nftContractData.id;

    nft.save();
  }

  return nft;
}
