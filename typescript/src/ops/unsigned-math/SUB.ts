import { UINT256_MAX } from "../../constants/evm";

export const SUB = (stack: bigint[]) => {
  const a = stack.pop();
  const b = stack.pop();

  if (!a || !b) return;

  const res = a - b;

  if (res < 0) return stack.push(UINT256_MAX - (b - a));
  else stack.push(res);
};
