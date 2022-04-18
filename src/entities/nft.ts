import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { Nft, NftContractData } from "../../generated/schema";
import { upsertNftContractData } from "./nftContractData";

export function upsertNft(nftContractDataId: string, tokenId: BigInt): Nft {
  let nftId = nftContractDataId + "-" + tokenId.toString();
  let nft = Nft.load(nftId);

  if (nft === null) {
    nft = new Nft(nftId);
    nft.tokenId = tokenId;
    nft.contract = nftContractDataId;
    nft.save();
  }

  return nft;
}
