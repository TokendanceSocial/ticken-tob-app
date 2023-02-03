export async function fetchAirDropList(eventAddress: string) {
  return [];
}

export async function fetchAirDropDetail(recordId: string) {
  return {
    operationTime: 0,
    operationAddress: '',
    amount: 0,
    status: 1,
    list: []
  }
}


export async function addAirdrop(eventAddress: string) {
  return;
}

export async function fetchEventDetail(eventAddress: string) {
  return {
    name: '111'
  };
}


export async function fetchEventList() {
  return []
}

export async function createEvent() {
  return;
}

export async function closeEvent(eventAddress: string) {
  return;
}


export async function addWriteOff(eventAddress: string) {
  return;
}