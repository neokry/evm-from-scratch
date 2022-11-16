import { UINT256_MAX, UINT256_MAX_BIT_LENGTH } from "../constants/evm";

export const SMOD = (stack: bigint[]) => {
  const a = stack.pop();
  const b = stack.pop();

  if (!a || !b) return stack.push(0n);
  const shiftCount = BigInt(UINT256_MAX_BIT_LENGTH - 1);

  const negA = (a >> shiftCount) & BigInt(0x1);
  const negB = (b >> shiftCount) & BigInt(0x1);

  //Both positive
  if (!negA && !negB) return stack.push(a % b);

  //Both negative
  if (negA && negB) {
    const posA = UINT256_MAX - a;
    const posB = UINT256_MAX - b;
    return stack.push(UINT256_MAX - (posA % posB));
  }

  if (negA) {
    const posA = UINT256_MAX - a;
    return stack.push(UINT256_MAX - (posA % b));
  }

  if (negB) {
    const posB = UINT256_MAX - b;
    return stack.push(UINT256_MAX - (a % posB));
  }
};
