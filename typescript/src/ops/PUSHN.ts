import { MergeBytes } from "../utils/MergeBytes";

export const PUSHN = (stack: any[], bytes: bigint[]) => {
  if (bytes.length == 1) return stack.push(BigInt(bytes[0]));
  stack.push(BigInt(MergeBytes(bytes)));
};
