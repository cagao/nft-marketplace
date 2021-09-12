import { create as ipfsHttpClient } from "ipfs-http-client";

export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

export const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export async function upload(file) {
  const added = await client.add(file, {
    progress: (prog) => console.log(`received: ${prog}`),
  });

  const url = `https://ipfs.infura.io/ipfs/${added.path}`;
  return { target: { value: url } };
}
