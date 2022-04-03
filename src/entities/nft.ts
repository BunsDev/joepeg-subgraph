import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Nft } from "../../generated/schema";

export function upsertNft(collection: Address, tokenId: BigInt) {
  let collectionHexString = collection.toHexString();
  let nftId = collectionHexString + "-" + tokenId.toString();
  let nft = Nft.load(nftId);

  if (nft === null) {
    nft = new Nft(nftId);
    nft.contract = collectionHexString;
    nft.tokenId = tokenId;

    nft.save();
  }

  return nft;
}
