// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { Provider } from '@ethersproject/providers';
import { ContractTransaction } from 'ethers/lib/ethers';
import { useState } from 'react';
import { useProvider, useAccount } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/constanst/token';
import { EventInfo } from '@/typechain-types/contracts/Admin';
import { Admin__factory, Event__factory } from '@/typechain-types/index';

export function useFetchAirDropList() {}

export async function fetchAirDropDetail(recordId: string) {
  return {
    operationTime: 0,
    operationAddress: '',
    amount: 0,
    status: 1,
    list: [],
  };
}

export interface addAirdropReq {
  eventAddress: string;
  address: string[];
}

export function useAddAirdrop(eventAddress: string, address: string[]) {
  // 空投
  return useAbi<ContractTransaction, addAirdropReq>((provide, account, _) => {
    const connect = Event__factory.connect(eventAddress, provide);
    return connect.batchMint(_.address);
  });
}

export interface fetchEventDetailReq {
  eventAddress: string;
  address: string;
}
export function useFetchEventDetail(eventAddress: string, user: string) {
  return useAbi<EventInfo.AllInfoStructOutput, fetchEventDetailReq>((provide, account, _) => {
    const connect = Event__factory.connect(eventAddress, provide);
    return connect.allUserInfo(_.address);
  });
}

export function useEventList() {
  // 获取B端列表
  return useAbi<EventInfo.AllInfoStructOutput[], unknown>((provide, account) => {
    const connect = Admin__factory.connect(CONTRACT_ADDRESS, provide);
    return connect.eventsForOwner(account.address);
  });
}
export interface createEventReq {
  name: string; // 名称
  symbol: string; // 活动缩写
  holdTime: number; // 时间
  personLimit: number; // 人数限制
  price: number; // 价格
  rebates: number; // 返佣比例
  meta: string; // 元数据
  receiver: string; // 返佣收款人（填写创建者地址）
  eventType: 0 | 1; // 如0为公售，1为仅限邀请
}
export function useCreateEvent() {
  // 创建活动
  return useAbi<ContractTransaction, createEventReq>((provide, account, _) => {
    const connect = Admin__factory.connect(CONTRACT_ADDRESS, provide);
    return connect.createEvent(
      _.name,
      _.symbol,
      _.holdTime,
      _.personLimit,
      _.price,
      _.rebates,
      _.meta,
      _.receiver,
      _.eventType,
    );
  });
}

export async function useCloseEvent(eventAddress: string) {
  // 关闭活动
  return useAbi<ContractTransaction, string>((provide, account, _) => {
    const connect = Event__factory.connect(eventAddress, provide);
    return connect.closeEvent();
  });
}

export interface addWriteOffReq {
  eventAddress: string;
  address: string[];
}
export async function useAddWriteOff() {
  // 批量增加核销人
  return useAbi<ContractTransaction, addWriteOffReq>((provide, account, _) => {
    const connect = Event__factory.connect(_.eventAddress, provide);
    return connect.batchAddSigner(_.address);
  });
}

function useAbi<T, U>(_run: (provide: Provider, account: any, req: U) => Promise<T>) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const provide = useProvider();
  const account = useAccount();
  const run = async (req: U) => {
    setLoading(true);
    try {
      const data = await _run(provide, account, req);
      setData(data);
      return data;
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  return {
    data,
    run,
    error,
    loading,
  };
}
