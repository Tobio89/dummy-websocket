export interface Tx {
  id: number;
  txhash: string;
  chaincodename: string;
  createdt: string;
  tx_from: string;
  tx_to: string;
  tx_action: string;
  tx_value: string;
}

export interface Block {
  blocknum: number;
  txcount: number;
  blockhash: string;
  createdt: string;
}

export interface Package extends Block {
  txdata: Tx[];
  notify_type: string;
}
