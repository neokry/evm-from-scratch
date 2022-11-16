export const LT = (stack: bigint[]) => {
  const a = stack.pop() || 0;
  const b = stack.pop() || 0;
  return stack.push(BigInt(a < b));
};
