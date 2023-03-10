/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IEventInitail,
  IEventInitailInterface,
} from "../../../contracts/IEventInitial.sol/IEventInitail";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_holdTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_personLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rebates",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_meta",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "owner",
        type: "address",
      },
      {
        internalType: "enum EventInfo.EventType",
        name: "_event_type",
        type: "uint8",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IEventInitail__factory {
  static readonly abi = _abi;
  static createInterface(): IEventInitailInterface {
    return new utils.Interface(_abi) as IEventInitailInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IEventInitail {
    return new Contract(address, _abi, signerOrProvider) as IEventInitail;
  }
}
