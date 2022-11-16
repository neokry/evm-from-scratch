export const MULMOD = (stack: bigint[]) => {
  const a = stack.pop();
  const b = stack.pop();
  const c = stack.pop();

  if (!a || !b || !c) return stack.push(0n);

  const res = (a * b) % c;
  return stack.push(res);
};
