/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  TransparentUpgradeableProxy,
  TransparentUpgradeableProxyInterface,
} from "../../../../../@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "address",
        name: "admin_",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "admin_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "implementation_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x6080604052604051620018d6380380620018d6833981810160405281019062000029919062000748565b82816200003f828260006200005b60201b60201c565b505062000052826200009e60201b60201c565b50505062000a8a565b6200006c83620000fc60201b60201c565b6000825111806200007a5750805b1562000099576200009783836200015360201b6200034a1760201c565b505b505050565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f620000cf6200018960201b60201c565b82604051620000e0929190620007d4565b60405180910390a1620000f981620001ed60201b60201c565b50565b6200010d81620002dd60201b60201c565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b6060620001818383604051806060016040528060278152602001620018af60279139620003b360201b60201c565b905092915050565b6000620001c47fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b6200044560201b620003771760201c565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036200025f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002569062000888565b60405180910390fd5b80620002997fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b6200044560201b620003771760201c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b620002f3816200044f60201b620003811760201c565b62000335576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200032c9062000920565b60405180910390fd5b806200036f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b6200044560201b620003771760201c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808573ffffffffffffffffffffffffffffffffffffffff1685604051620003df91906200098f565b600060405180830381855af49150503d80600081146200041c576040519150601f19603f3d011682016040523d82523d6000602084013e62000421565b606091505b50915091506200043a868383876200047260201b60201c565b925050509392505050565b6000819050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60608315620004e2576000835103620004d95762000496856200044f60201b60201c565b620004d8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620004cf90620009f8565b60405180910390fd5b5b829050620004f5565b620004f48383620004fd60201b60201c565b5b949350505050565b600082511115620005115781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000547919062000a66565b60405180910390fd5b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620005918262000564565b9050919050565b620005a38162000584565b8114620005af57600080fd5b50565b600081519050620005c38162000598565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200061e82620005d3565b810181811067ffffffffffffffff8211171562000640576200063f620005e4565b5b80604052505050565b60006200065562000550565b905062000663828262000613565b919050565b600067ffffffffffffffff821115620006865762000685620005e4565b5b6200069182620005d3565b9050602081019050919050565b60005b83811015620006be578082015181840152602081019050620006a1565b60008484015250505050565b6000620006e1620006db8462000668565b62000649565b9050828152602081018484840111156200070057620006ff620005ce565b5b6200070d8482856200069e565b509392505050565b600082601f8301126200072d576200072c620005c9565b5b81516200073f848260208601620006ca565b91505092915050565b6000806000606084860312156200076457620007636200055a565b5b60006200077486828701620005b2565b93505060206200078786828701620005b2565b925050604084015167ffffffffffffffff811115620007ab57620007aa6200055f565b5b620007b98682870162000715565b9150509250925092565b620007ce8162000584565b82525050565b6000604082019050620007eb6000830185620007c3565b620007fa6020830184620007c3565b9392505050565b600082825260208201905092915050565b7f455243313936373a206e65772061646d696e20697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006200087060268362000801565b91506200087d8262000812565b604082019050919050565b60006020820190508181036000830152620008a38162000861565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b600062000908602d8362000801565b91506200091582620008aa565b604082019050919050565b600060208201905081810360008301526200093b81620008f9565b9050919050565b600081519050919050565b600081905092915050565b6000620009658262000942565b6200097181856200094d565b9350620009838185602086016200069e565b80840191505092915050565b60006200099d828462000958565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000620009e0601d8362000801565b9150620009ed82620009a8565b602082019050919050565b6000602082019050818103600083015262000a1381620009d1565b9050919050565b600081519050919050565b600062000a328262000a1a565b62000a3e818562000801565b935062000a508185602086016200069e565b62000a5b81620005d3565b840191505092915050565b6000602082019050818103600083015262000a82818462000a25565b905092915050565b610e158062000a9a6000396000f3fe60806040526004361061004e5760003560e01c80633659cfe6146100675780634f1ef286146100905780635c60da1b146100ac5780638f283970146100d7578063f851a440146101005761005d565b3661005d5761005b61012b565b005b61006561012b565b005b34801561007357600080fd5b5061008e6004803603810190610089919061091b565b610145565b005b6100aa60048036038101906100a591906109ad565b6101ab565b005b3480156100b857600080fd5b506100c1610248565b6040516100ce9190610a1c565b60405180910390f35b3480156100e357600080fd5b506100fe60048036038101906100f9919061091b565b61029f565b005b34801561010c57600080fd5b506101156102f3565b6040516101229190610a1c565b60405180910390f35b6101336103a4565b61014361013e610423565b610432565b565b61014d610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361019f5761019a816040518060200160405280600081525060006104af565b6101a8565b6101a761012b565b5b50565b6101b3610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361023a576102358383838080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505060016104af565b610243565b61024261012b565b5b505050565b6000610252610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036102935761028c610423565b905061029c565b61029b61012b565b5b90565b6102a7610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036102e7576102e2816104db565b6102f0565b6102ef61012b565b5b50565b60006102fd610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361033e57610337610458565b9050610347565b61034661012b565b5b90565b606061036f8383604051806060016040528060278152602001610db960279139610527565b905092915050565b6000819050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6103ac610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610419576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041090610ae0565b60405180910390fd5b6104216105ad565b565b600061042d6105af565b905090565b3660008037600080366000845af43d6000803e8060008114610453573d6000f35b3d6000fd5b60006104867fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b610377565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6104b883610606565b6000825111806104c55750805b156104d6576104d4838361034a565b505b505050565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f610504610458565b82604051610513929190610b00565b60405180910390a161052481610655565b50565b60606000808573ffffffffffffffffffffffffffffffffffffffff16856040516105519190610b9a565b600060405180830381855af49150503d806000811461058c576040519150601f19603f3d011682016040523d82523d6000602084013e610591565b606091505b50915091506105a286838387610735565b925050509392505050565b565b60006105dd7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b610377565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61060f816107aa565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036106c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bb90610c23565b60405180910390fd5b806106f17fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b610377565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6060831561079757600083510361078f5761074f85610381565b61078e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078590610c8f565b60405180910390fd5b5b8290506107a2565b6107a18383610863565b5b949350505050565b6107b381610381565b6107f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e990610d21565b60405180910390fd5b8061081f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b610377565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000825111156108765781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108aa9190610d96565b60405180910390fd5b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006108e8826108bd565b9050919050565b6108f8816108dd565b811461090357600080fd5b50565b600081359050610915816108ef565b92915050565b600060208284031215610931576109306108b3565b5b600061093f84828501610906565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261096d5761096c610948565b5b8235905067ffffffffffffffff81111561098a5761098961094d565b5b6020830191508360018202830111156109a6576109a5610952565b5b9250929050565b6000806000604084860312156109c6576109c56108b3565b5b60006109d486828701610906565b935050602084013567ffffffffffffffff8111156109f5576109f46108b8565b5b610a0186828701610957565b92509250509250925092565b610a16816108dd565b82525050565b6000602082019050610a316000830184610a0d565b92915050565b600082825260208201905092915050565b7f5472616e73706172656e745570677261646561626c6550726f78793a2061646d60008201527f696e2063616e6e6f742066616c6c6261636b20746f2070726f7879207461726760208201527f6574000000000000000000000000000000000000000000000000000000000000604082015250565b6000610aca604283610a37565b9150610ad582610a48565b606082019050919050565b60006020820190508181036000830152610af981610abd565b9050919050565b6000604082019050610b156000830185610a0d565b610b226020830184610a0d565b9392505050565b600081519050919050565b600081905092915050565b60005b83811015610b5d578082015181840152602081019050610b42565b60008484015250505050565b6000610b7482610b29565b610b7e8185610b34565b9350610b8e818560208601610b3f565b80840191505092915050565b6000610ba68284610b69565b915081905092915050565b7f455243313936373a206e65772061646d696e20697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610c0d602683610a37565b9150610c1882610bb1565b604082019050919050565b60006020820190508181036000830152610c3c81610c00565b9050919050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000610c79601d83610a37565b9150610c8482610c43565b602082019050919050565b60006020820190508181036000830152610ca881610c6c565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b6000610d0b602d83610a37565b9150610d1682610caf565b604082019050919050565b60006020820190508181036000830152610d3a81610cfe565b9050919050565b600081519050919050565b6000601f19601f8301169050919050565b6000610d6882610d41565b610d728185610a37565b9350610d82818560208601610b3f565b610d8b81610d4c565b840191505092915050565b60006020820190508181036000830152610db08184610d5d565b90509291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212200fc6747a2c2065c68ded1d05b604c9ea21a74a61bdb9658660e830de32c5346e64736f6c63430008110033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564";

type TransparentUpgradeableProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TransparentUpgradeableProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TransparentUpgradeableProxy__factory extends ContractFactory {
  constructor(...args: TransparentUpgradeableProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _logic: PromiseOrValue<string>,
    admin_: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<TransparentUpgradeableProxy> {
    return super.deploy(
      _logic,
      admin_,
      _data,
      overrides || {}
    ) as Promise<TransparentUpgradeableProxy>;
  }
  override getDeployTransaction(
    _logic: PromiseOrValue<string>,
    admin_: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_logic, admin_, _data, overrides || {});
  }
  override attach(address: string): TransparentUpgradeableProxy {
    return super.attach(address) as TransparentUpgradeableProxy;
  }
  override connect(signer: Signer): TransparentUpgradeableProxy__factory {
    return super.connect(signer) as TransparentUpgradeableProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TransparentUpgradeableProxyInterface {
    return new utils.Interface(_abi) as TransparentUpgradeableProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TransparentUpgradeableProxy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TransparentUpgradeableProxy;
  }
}
