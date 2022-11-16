import { UINT256_MAX } from "../constants/evm";

export const SIGNEXTEND = (stack: any[]) => {
  const byteNum = stack.pop();
  const val = stack.pop();

  const neg = val >> BigInt(7);
  if (!neg) return stack.push(val);

  const extended = UINT256_MAX - (byteNum + BigInt(1));
  stack.push(extended);
};
