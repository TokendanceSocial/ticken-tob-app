// ipfs metadat 后面可迁移到S3
import axios from 'axios';
import { NFTStorage } from 'nft.storage';
import { NFT_STORAGE_TOKEN } from '@/constanst/token';


export const nftUpload = async (data: any): Promise<string> => {
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  const metadata = await client.store(data);
  if (!(metadata as any).ipnft) {
    return Promise.reject('元数据生成失败');
  }
  return `https://${(metadata as any).ipnft}.ipfs.nftstorage.link/metadata.json`;
};

export const renderNftImg = (image: string) => {
  if (image.startsWith('ipfs://')) {
    const idReg = /\/\/.*\//g;
    const match = image!.match(idReg);
    if (match) {
      const idMatch = match[0];
      const id = idMatch.slice(2, idMatch.length - 1);
      const nameIndex = image.lastIndexOf('/');
      const name = image.slice(nameIndex + 1);
      return `https://${id}.ipfs.nftstorage.link/${name}`;
    }
  }
  return image;
};

export async function getMeta(mataURL: string): Promise<{
  image: string;
  location: string;
  description: string;
}> {
  const data = await axios
    .request({
      method: 'get',
      url: mataURL,
    });
  return data.data;
}