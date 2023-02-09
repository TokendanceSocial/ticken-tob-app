import { Provider } from '@ethersproject/providers';
import { Modal, message } from 'antd';
import { ethers } from 'ethers';
import { ContractTransaction } from 'ethers/lib/ethers';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useProvider, useAccount, useSigner, useNetwork } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/constanst/token';
import { EventInfo } from '@/typechain-types/contracts/Admin';
import { Admin__factory, Event__factory } from '@/typechain-types/index';

export function useFetchAirDropList() {
  return useAbi<string[], string>((provide, singer, account, _?: any) => {
    const connect = Event__factory.connect(_, provide);
    return connect.airdropUsers();
  });
}

export function fetchAirDropDetail(recordId: string) {
  return {
    operationTime: 0,
    operationAddress: '',
    amount: 0,
    status: 1,
    list: [],
  };
}

export function useFetchWriteOffList() {
  // 获取核销列表
  return useAbi<string[], string>((provide, singer, account, _?: any) => {
    const connect = Event__factory.connect(_, provide);
    return connect.signerUsers();
  });
}
export interface addAirdropReq {
  eventAddress: string;
  address: string[];
}

export function useAddAirdrop() {
  // 空投

  return useAbi<ContractTransaction, addAirdropReq>((provide, singer, account, _?: any) => {
    const connect = Event__factory.connect(_.eventAddress, singer);
    return connect.batchMint(_.address);
  });
}

export interface fetchEventDetailReq {
  eventAddress: string;
  address: string;
}
export function useFetchEventDetail() {
  return useAbi<EventInfo.AllInfoStructOutput, fetchEventDetailReq>(
    (provide, singer, account, _?: any) => {
      const connect = Event__factory.connect(_.eventAddress, provide);
      return connect.allUserInfo(_.address);
    },
  );
}

export function useEventList() {
  const { chain } = useNetwork();
  return useAbi<EventInfo.AllInfoStructOutput[], any>((provide, singer, account) => {
    const connect = Admin__factory.connect(CONTRACT_ADDRESS[chain?.id || 80001], provide);
    return connect.eventsForOwner(account.address);
  });
}
export interface createEventReq {
  name: string; // 名称
  symbol: string; // 活动缩写
  holdTime: number; // 时间
  personLimit?: number; // 人数限制
  price: number; // 价格
  rebates?: number; // 返佣比例
  meta: string; // 元数据
  receiver: string; // 返佣收款人（填写创建者地址）
  eventType: 0 | 1; // 如0为公售，1为仅限邀请
}
export function useCreateEvent() {
  const { chain } = useNetwork();
  // 创建活动
  return useAbi<ContractTransaction, createEventReq>((provide, singer: any, account, _: any) => {

    const connect = Admin__factory.connect(CONTRACT_ADDRESS[chain?.id || 80001], singer);
    return connect.createEvent(
      _.name,
      _.symbol,
      _.holdTime,
      _.personLimit,
      ethers.utils.parseEther(_.price?.toString() || '0'),
      _.rebates,
      _.meta,
      _.receiver,
      _.eventType,
    );
  });
}

export function useCloseEvent() {
  // 关闭活动
  return useAbi<ContractTransaction, string>((provide, singer, account, _?: any) => {
    const connect = Event__factory.connect(_, singer);
    return connect.closeEvent();
  });
}

export interface addWriteOffReq {
  eventAddress: string;
  address: string[];
}
export function useAddWriteOff() {
  // 批量增加核销人
  return useAbi<ContractTransaction, addWriteOffReq>((provide, singer, account, _?: any) => {
    const connect = Event__factory.connect(_.eventAddress, singer);
    return connect.batchAddSigner(_.address);
  });
}

function useAbi<T extends any, U>(
  _run: (provide: Provider, singer: any, account: any, req?: U) => Promise<T>,
) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const provide = useProvider();
  const account = useAccount();
  const singer = useSigner();
  const { t } = useTranslation();
  const run = useCallback(
    async (req?: U) => {
      setLoading(true);
      try {
        let data = await _run(provide, singer.data, account, req);
        // @ts-ignore
        if (data.wait) {
          message.loading({
            content: t('transactionSuccess'),
            duration: 0,
            key: 'loading',
          });
          // @ts-ignore
          data = await data.wait();
          message.destroy('loading');
        }
        setData(data);
        setLoading(false);
        return data;
      } catch (error: any) {
        setLoading(false);
        message.destroy();
        message.error(error.toString());
        setError(error);
        return Promise.reject(error);
      } finally {
        setLoading(false);
      }
    },
    [_run, account, provide, singer.data],
  );
  return {
    data,
    run,
    error,
    loading,
  };
}
