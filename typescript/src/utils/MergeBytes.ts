import { BYTE_SIZE } from "../constants/evm";

export const MergeBytes = (bytes: bigint[]) => {
  let merge = bytes[0];

  // Shift bytes and fill in with next set
  for (let i = 1; i < bytes.length; i++)
    merge = (merge << BYTE_SIZE) | bytes[i];

  return merge;
};
