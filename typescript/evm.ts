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

import {
  ADD,
  ADDMOD,
  DIV,
  EXP,
  MOD,
  MUL,
  MULMOD,
  PUSHN,
  SDIV,
  SIGNEXTEND,
  SMOD,
  SUB,
} from "./src/ops";

let pc = 0;

const ExecOp = (stack: bigint[], code: Uint8Array) => {
  const opcode = code[pc];
  pc++;

  console.log("opcode", opcode);

  //STOP
  if (opcode == 0) return -1;

  //Unsigned Math
  if (opcode == 1) ADD(stack);
  if (opcode == 2) MUL(stack);
  if (opcode == 3) SUB(stack);
  if (opcode == 4) DIV(stack);
  if (opcode == 6) MOD(stack);
  if (opcode == 8) ADDMOD(stack);
  if (opcode == 9) MULMOD(stack);
  if (opcode == 10) EXP(stack);

  //Signed Math
  if (opcode == 11) SIGNEXTEND(stack);
  if (opcode == 5) SDIV(stack);
  if (opcode == 7) SMOD(stack);

  //POP
  if (opcode == 80) stack.pop();

  //PUSH 1 - 32
  if (opcode > 95) {
    const byteCount = opcode - 95;
    const bytes: bigint[] = [];
    for (let i = 0; i < byteCount; i++) bytes.push(BigInt(code[pc++]));
    PUSHN(stack, bytes);
  }

  return 1;
};

export default function evm(code: Uint8Array) {
  let stack: bigint[] = [];
  pc = 0;

  while (pc < code.length) {
    const res = ExecOp(stack, code);
    if (res < 0) break;
  }

  return { success: true, stack: stack.reverse() };
}
