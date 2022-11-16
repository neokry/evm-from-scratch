export const ISZERO = (stack: bigint[]) => {
  const val = stack.pop() || BigInt(0);
  return stack.push(BigInt(val == BigInt(0)));
};
