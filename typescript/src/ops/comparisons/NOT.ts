import { UINT256_MAX } from "../../constants/evm";
import { CountBits } from "../../utils/CountBits";

export const NOT = (stack: bigint[]) => {
  const val = stack.pop() || BigInt(0);

  //Get the inverted value
  const notVal = BigInt(~parseInt(val.toString()) >>> 0);

  //Extend to UINT256 size
  const extension = (UINT256_MAX - notVal) | notVal;
  return stack.push(extension);
};
