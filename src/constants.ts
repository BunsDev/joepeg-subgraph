import { Address, BigInt } from "@graphprotocol/graph-ts";

// consts
export const ZERO_ADDRESS_STRING = "0x0000000000000000000000000000000000000000";

export const ADDRESS_ZERO = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const BIG_INT_ONE = BigInt.fromI32(1);

export const BIG_INT_ZERO = BigInt.fromI32(0);

export const NULL_IDENTIFIER = "00000000";
