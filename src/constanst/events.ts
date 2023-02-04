export enum EventState {
  Live,
  Close,
}

export enum EventType {
  PublicSale,
  InviteOnly
}

export const stateText = {
  [EventState.Live]: 'Live',
  [EventState.Close]: 'Close',
}

export const typeText: Record<number, string> = {
  [EventType.PublicSale]: 'Public Sale',
  [EventType.InviteOnly]: 'Invite Only',
}
export interface BasicInfo {
  id: string;
  name: string;
  type: EventType;
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
