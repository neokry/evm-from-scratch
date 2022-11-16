import { UINT256_MAX_BIT_LENGTH } from "../../constants/evm";

export const SGT = (stack: bigint[]) => {
  const a = stack.pop() || BigInt(0);
  const b = stack.pop() || BigInt(0);

  const shiftCount = BigInt(UINT256_MAX_BIT_LENGTH - 1);

  const negA = (a >> shiftCount) & BigInt(0x1);
  const negB = (b >> shiftCount) & BigInt(0x1);

  if ((!negA && !negB) || (negA && negB)) return stack.push(BigInt(a > b));
  if (negA) return stack.push(BigInt(0));
  else return stack.push(BigInt(1));
};
