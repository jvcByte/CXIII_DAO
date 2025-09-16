import type { Abi, Address } from "viem";
import CXII_DAO_ABI from "./abis/CXII_DAO";
import DAO_Token_ABI from "./abis/$DAO";

type TContracts = Record<
  string,
  {
    address: Address;
    abi: Abi;
  }
>;

const contracts = {
  CXII_DAO: {
    address: "0xd3d8ec48ba24fadeab6a15a216fc8154bde2f177",
    abi: CXII_DAO_ABI,
  },
  DAO_Token: {
    address: "0x8035e0479e339a31e3b248e43ecfbd427e823f56",
    abi: DAO_Token_ABI,
  },
} as const satisfies TContracts;

export default contracts;
