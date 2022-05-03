import { Address, BigInt } from "@graphprotocol/graph-ts";

// consts
export const ZERO_ADDRESS_STRING = "0x0000000000000000000000000000000000000000";

export const ADDRESS_ZERO = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const BIG_INT_ONE = BigInt.fromI32(1);

export const BIG_INT_ZERO = BigInt.fromI32(0);

export const NULL_IDENTIFIER = "00000000";

export const WAVAX_ADDRESS_MAINNET =
  "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7";
export const WAVAX_ADDRESS_FUJI = "0xd00ae08403B9bbb9124bB305C09058E32C39A48c";
