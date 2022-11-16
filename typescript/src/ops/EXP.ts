import { UINT256_MAX } from "../constants/evm";

export const EXP = (stack: bigint[]) => {
  const a = stack.pop();
  const b = stack.pop();

  if (!a || !b) return;

  const res = a ** b;
  const overflow = res - UINT256_MAX;

  if (overflow > 0) stack.push(overflow);
  else stack.push(res);
};
