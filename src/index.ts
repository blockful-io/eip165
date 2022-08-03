import { keccak256 } from "js-sha3"

export const interfaceIdFromABI = (abi: any): string => {
  try {
    const prepareData = (e: any) => `${e.name}(${e.inputs.map((e: any) => e.type)})`

    const encodeSelector = (f: string): any => "0x" + keccak256(f).slice(0, 8);

    // Parse ABI and encode its functions
    const functionSelectors = abi
      .filter((e: any) => e.type === "function")
      .flatMap((e: any) => `${encodeSelector(prepareData(e))}`);

    // Xor the output values and convert to hex
    const interfaceId = "0x" + functionSelectors.reduce((prev: number, cur: number) => (prev ^ cur) >>> 0).toString(16);

    return interfaceId;
  } catch (err) { throw (err) }
}