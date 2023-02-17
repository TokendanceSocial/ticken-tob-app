import axios from "axios";

export async function getBitName(address: `0x${string}`, chainId: number, onSuccess: (displayName: string) => void) {
  try {
    const { data } = await axios.request({
      method: 'post',
      url: 'https://indexer-v1.did.id/v1/reverse/record',

      data: {
        "type": "blockchain",
        "key_info": {
          "coin_type": "966",
          "chain_id": String(chainId),
          "key": address
        }
      }
    });
    if (data.errno === 0 && data.data.account) {
      onSuccess(data.data.account);
    }
  } catch (error) {
    console.log(error)
  }
}