export const DIV = (stack: bigint[]) => {
  const a = stack.pop();
  const b = stack.pop();

  if (!a || !b) return stack.push(0n);

  const res = a / b;
  return stack.push(res);
};
