import { Block, Package, Tx } from "../types";

function randomString() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .slice(0, 64);
}

function randomValue() {
  return Math.floor(Math.random() * 10000);
}

function randomHash() {
  return "0x" + randomString();
}

function makeDummyTX(id: number): Tx {
  return {
    id,
    txhash: randomHash(),
    chaincodename: "test",
    createdt: "2022-02-17",
    tx_from: randomHash(),
    tx_to: randomHash(),
    tx_action: "swap",
    tx_value: randomValue().toString(),
  };
}

function makeDummyBlock(txcount: number): Block {
  return {
    blocknum: randomValue(),
    txcount,
    blockhash: randomHash(),
    createdt: "2022-02-17",
  };
}

export function makeDummyPackage(id: number, range: number): Package {
  const block = makeDummyBlock(range);
  const txdata = [];
  for (let i = 0; i < range; i++) {
    txdata.push(makeDummyTX(id + i));
  }

  return {
    ...block,
    txdata,
    notify_type: "dont-know",
  };
}
