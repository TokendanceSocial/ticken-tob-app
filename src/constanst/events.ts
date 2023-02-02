export enum EventState {
  Live,
  Close,
  Draft
}

export const stateText = {
  [EventState.Live]: 'Live',
  [EventState.Draft]: 'Draft',
  [EventState.Close]: 'Close',
}
export interface BasicInfo {
  id: string;
  name: string;
  symbol: string;
  holdTime: number;
  personLimit: number;
  price: number;
  metaURL: string;
  state: EventState;
  contractAddress: string;
}

export interface UserInfo {
  tokenId: number;
  canInvite: boolean;
  isSigned: boolean;
  isSigner: boolean;
}

export interface EventInfo {
  basic: BasicInfo;
  user: UserInfo;
}