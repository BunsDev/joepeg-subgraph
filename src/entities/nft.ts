import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { Nft, NftContractData } from "../../generated/schema";
import { upsertNftContractData } from "./nftContractData";

export function upsertNft(nftContractData: NftContractData, tokenId: BigInt): Nft {
  let nftId = nftContractData.id + "-" + tokenId.toString();
  let nft = Nft.load(nftId);

  if (nft === null) {
    nft = new Nft(nftId);
    nft.tokenId = tokenId;
    nft.contract = nftContractData.id;
    nft.save();
  }

  return nft;
}
