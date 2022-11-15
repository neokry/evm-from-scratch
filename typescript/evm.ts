/**
 * EVM From Scratch
 * TypeScript template
 *
 * To work on EVM From Scratch in TypeScript:
 *
 * - Install Node.js: https://nodejs.org/en/download/
 * - Go to the `typescript` directory: `cd typescript`
 * - Install dependencies: `yarn` (or `npm install`)
 * - Edit `evm.ts` (this file!), see TODO below
 * - Run `yarn test` (or `npm test`) to run the tests
 * - Use Jest Watch Mode to run tests when files change: `yarn test --watchAll`
 */

//UTILS
const byteSize = BigInt(8);

const MergeBytes = (bytes: bigint[]) => {
  let merge = bytes[0];

  // Shift bytes and fill in with next set
  for (let i = 1; i < bytes.length; i++) merge = (merge << byteSize) | bytes[i];

  return merge;
};

const uint245Max =
  BigInt(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);

//OPS
const PUSHN = (stack: any[], bytes: bigint[]) => {
  if (bytes.length == 1) return stack.push(BigInt(bytes[0]));
  stack.push(BigInt(MergeBytes(bytes)));
};

const ADD = (stack: bigint[]) => {
  const a = stack.pop();
  const b = stack.pop();

  if (!a || !b) return;

  const res = a + b;
  const overflow = res - uint245Max;

  if (overflow > 0) stack.push(overflow);
  else stack.push(res);
};

const MUL = (stack: bigint[]) => {
  const a = stack.pop();
  const b = stack.pop();

  if (!a || !b) return;

  const res = a * b;
  const overflow = res - uint245Max;

  if (overflow > 0) stack.push(overflow);
  else stack.push(res);
};

export default function evm(code: Uint8Array) {
  let pc = 0;
  let stack: bigint[] = [];

  while (pc < code.length) {
    const opcode = code[pc];
    pc++;

    console.log("pc", pc, "code", code, "stack", stack, "opcode", opcode);

    //STOP
    if (opcode == 0) break;

    //ADD
    if (opcode == 1) {
      ADD(stack);
      continue;
    }

    if (opcode == 2) {
      MUL(stack);
      continue;
    }

    //POP
    if (opcode == 80) {
      stack.pop();
    }

    //PUSH 1 - 32
    if (opcode > 95) {
      const byteCount = opcode - 95;
      const bytes: bigint[] = [];
      for (let i = 0; i < byteCount; i++) bytes.push(BigInt(code[pc++]));
      PUSHN(stack, bytes);
    }
  }

  return { success: true, stack: stack.reverse() };
}
