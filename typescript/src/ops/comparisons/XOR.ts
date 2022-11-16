export const XOR = (stack: bigint[]) => {
  const a = stack.pop() || BigInt(0);
  const b = stack.pop() || BigInt(0);
  return stack.push(BigInt(a ^ b));
};
